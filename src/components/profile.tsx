import app, { Component } from 'apprun';
import { IProfile } from '../models';
import { articles, profile } from '../api';
import Articles from './article-list';
import Pages from './page-list';

const PAGE_SIZE = 10;

class profileComponent extends Component {
  state = {
    name: '',
    type: 'articles',
    page: 1
  }

  view = (state) => {
    const profile = state.profile as IProfile;
    if (!profile) return;
    return <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={profile.image} className="user-img" />
              <h4>{profile.username}</h4>
              <p>
                {profile.bio}
              </p>
              <button className="btn btn-sm btn-outline-secondary action-btn"
                onclick={e => app.run('#toggle-follow', profile, 'on-profile')}>
                {profile.following
                  ? <span><i className="ion-minus-round"></i> Unfollow {profile.username}</span>
                  : <span><i className="ion-plus-round"></i> Follow {profile.username}</span>
                }
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className={`nav-link ${state.type === 'articles' ? 'active' : ''}`}
                    href={`#/profile/${profile.username}/articles/1`}>My Articles</a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${state.type === 'favorites' ? 'active' : ''}`}
                    href={`#/profile/${profile.username}/favorites/1`}>Favorited Articles</a>
                </li>
              </ul>
            </div>
            <Articles articles={state.articles} id='profile-articles'/>
            <Pages max={Math.floor(state.max / PAGE_SIZE)} selected={state.page}
              onpage={page => this.run('set-page', page)} />
          </div>
        </div>
      </div>
    </div>
  }

  getState = async (state, name, type, page) => {
    name = name || state.name;
    type = type || state.type;
    page = parseInt(page) || state.page;
    let newState = state;
    if (name !== state.name) {
      const profileResult = await profile.get(name);
      newState = { ...newState, profile: profileResult.profile }
    }
    if (name !== state.name || type !== state.type || page !== state.page) {
      const limit = PAGE_SIZE;
      const offset = (page - 1) * limit;
      const articleResult = type === "favorites"
        ? await articles.search({ favorited: name, offset, limit })
        : await articles.search({ author: name, offset, limit });
      newState = {
        ...newState, name, type, page,
        articles: articleResult.articles,
        max: articleResult.articlesCount,
      }
    }
    return newState
  }

  update = {
    '#/profile': (state, name, type, page) => {
      return this.getState(state, name, type, page)
    },
    'set-page': (state, page) => {
      const url = `#/profile/${state.profile.username}/${state.type}/${page}`
      history.pushState(null, null, url);
      return this.getState(state, null, null, page)
    },
    '#update-profile-articles': (state, article) => {
      // ?
      const articles = state.articles.map(a => {
        return a.slug === article.slug ? article : a;
      })
      return { ...state, articles };
    },
    '#update-follow-on-profile': (state, profile) => {
      return { ...state, profile };
    }
  }
}

app.on('#toggle-follow', async (author: IProfile, id?) => {
  if (!app['user']) return app.run('#/login');
  const result = author.following
    ? await profile.unfollow(author.username)
    : await profile.follow(author.username);
  app.run(`#update-follow-${id}`, result.profile)
})

new profileComponent().mount('my-app')
