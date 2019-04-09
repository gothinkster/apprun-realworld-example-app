import app from 'apprun';
import { auth, tags, articles, comments, profile } from '../src/api';

app.on('#', async (route, ...p) => {
  app.run(`#/${route || ''}`, ...p);
})

auth.current = jest.fn(() => null);
auth.signIn = jest.fn(() => new Promise(r => r(
  {
    user: {
      username: '',
      bio: '',
      image: '',
      following: true
    }
  }
)));

auth.register = jest.fn(() => null);
auth.save = jest.fn(() => null);

tags.all = jest.fn(() => new Promise(r => r({ tags: ['1', '2', '3'] })));

articles.search = jest.fn(() => new Promise(r => r(({ articles: [], articlesCount: 101 }))));
articles.feed = jest.fn(() => new Promise(r => r({ articles: [], articlesCount: 5 })));
articles.get = jest.fn(() => new Promise(r => r(
  {
    article: {
      slug: '',
      author: {
        username: '',
        bio: '',
        image: '',
        following: true
      },
      title: '',
      body: '',
      description: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      favorited: true,
      favoritesCount: 0,
      tagList: []
    }
  }
)));

articles.delete = jest.fn(() => null);
articles.favorite = jest.fn(() => null);
articles.unfavorite = jest.fn(() => null);
articles.update = jest.fn(() => null);
articles.create = jest.fn(() => null);

comments.create = jest.fn(() => null);
comments.delete = jest.fn(() => null);
comments.forArticle = jest.fn(() => new Promise(r => r(({ comments: [] }))));

profile.get = jest.fn(() => null);
profile.follow = jest.fn(() => null);
profile.unfollow = jest.fn(() => null);
