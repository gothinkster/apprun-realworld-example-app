import app, { Component, on } from 'apprun';
import { IProfile } from '../models';
import { auth, articles, profile } from '../api';
import Articles from './article-list';
import Pages from './page-list';

const PAGE_SIZE = 10;

class ProfileComponent extends Component {
  state = {
    name: '',
    type: 'articles',
    articles: [],
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
                onclick={e => app.run('#toggle-follow', profile, 'profile')}>
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
            <Articles articles={state.articles} id='profile' />
            <Pages max={Math.floor(state.max / PAGE_SIZE)} selected={state.page}
              link={`#/profile/${state.profile.username}/${state.type}`} />
          </div>
        </div>
      </div>
    </div>
  }

  updateState = async (state, name, type, page) => {
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

  @on('#/profile') root = (state, name, type, page) => this.updateState(state, name, type, page)

  @on('/update-article') updateArticle = (state, article, id) => {
    state.articles = state.articles.map(a => {
      return a.slug === article.slug ? article : a;
    })
    return id === 'profile' ? state : null;
  }

  @on('#update-follow') updateFollow = (state, profile, id) => {
    state.profile = profile;
    return id === 'profile' ? state : null;
  }

  @on('#toggle-follow') toggleFollow = async (state, author: IProfile, id: string) => {
    if (!auth.authorized) return;
    const result = author.following
      ? await profile.unfollow(author.username)
      : await profile.follow(author.username);
    app.run(`#update-follow`, result.profile, id)
  }
}

export default new ProfileComponent().mount('my-app')
