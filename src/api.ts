import app from 'apprun';

// Conduit API
window['defaultBasePath'] = 'https://conduit.productionready.io/api';

import { toQueryString, serializeObject, getToken, setToken, get, post, del, put } from './fetch';
export { toQueryString, serializeObject }
import { IUser, IProfile, IArticle, IComment } from './models';

export interface IAuthResponse {
  user: IUser
}

export interface ITags {
  tags: Array<string>;
}

export interface IFeed {
  articles: Array<IArticle>;
  articlesCount: number;
}


export interface IArticlesRequest {
  tag?: string;
  author?: string;
  favorited?: string;
  limit: number;
  offset: number;
}

export interface INewArticle {
  title: string,
  description: string,
  body: string,
  tagList: Array<string>;

}

export interface IArticlesResponse {
  article: IArticle
}

export interface ICommentsResponse {
  comments: Array<IComment>
}

export interface IProfileResponse {
  profile: IProfile
}

export const tags = {
  all: () => get<ITags>('/tags')
}

export const auth = {
  current: () => getToken()
    ? get<IAuthResponse>('/user')
    : null,
  signIn: (user: { email: string, password: string }) =>
    post<IAuthResponse>('/users/login', { user }),
  register: (user: { username: string, email: string, password: string }) =>
    post<IAuthResponse>('/users', { user }),
  save: user =>
    put('/user', { user }),
  authorized: (): boolean => app['user']  ? true : app.run('#/login') && false // app.run returns true if found event handlers
}

export const articles = {
  search: (request: IArticlesRequest) =>
    get<IFeed>(`/articles?${toQueryString(request)}`),
  feed: (request: { limit: number, offset: number }) =>
    get<IFeed>(`/articles/feed?${toQueryString(request)}`),
  get: (slug: string) =>
    get<IArticlesResponse>(`/articles/${slug}`),
  delete: (slug: string) =>
    del(`/articles/${slug}`),
  favorite: (slug: string) =>
    post(`/articles/${slug}/favorite`),
  unfavorite: (slug: string) =>
    del(`/articles/${slug}/favorite`),
  update: (article: IArticle) =>
    put(`/articles/${article.slug}`, { article }),
  create: (article: INewArticle) =>
    post<IArticlesResponse>('/articles', { article })
}

export const comments = {
  create: (slug: string, comment: { body: string }) =>
    post(`/articles/${slug}/comments`, { comment }),
  delete: (slug: string, commentId: string) =>
    del(`/articles/${slug}/comments/${commentId}`),
  forArticle: (slug: string) =>
    get<ICommentsResponse>(`/articles/${slug}/comments`)
};

export const profile = {
  get: (username: string) =>
    get<IProfileResponse>(`/profiles/${username}`),
  follow: (username: string) =>
    post<IProfileResponse>(`/profiles/${username}/follow`),
  unfollow: (username: string) =>
    del(`/profiles/${username}/follow`)
};

app.on('/get-user', async () => {
  try {
    const current = await auth.current();
    if (current) app.run('/set-user', current.user);
  }
  catch {
    setToken(null);
    document.location.reload(true);
  }
});

app.on('/set-user', user => {
  app['user'] = user;
  setToken(user ? user.token : null);
});

app.on('/toggle-follow', async (author: IProfile, component) => {
  if (!auth.authorized()) return;
  const result = author.following
    ? await profile.unfollow(author.username)
    : await profile.follow(author.username);
  component.run('update-follow', result.profile);
});

app.on('/toggle-fav-article', async (article: IArticle, component) => {
  if (!auth.authorized()) return;
  const result = article.favorited
    ? await articles.unfavorite(article.slug)
    : await articles.favorite(article.slug);
  component.run('update-article', result.article);
});