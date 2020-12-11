import app, { Component, on } from 'apprun';
import { IProfile } from '../models';
import { articles, profile } from '../api';
import Articles from './article-list';
import Pages from './page-list';

const PAGE_SIZE = 10;

class ProfileComponent extends Component {
  state = {
    name: '',
    type: 'articles',
    articles: [],
    page: 1
  };

  view = (state) => {
    const profile = state.profile as IProfile;
    if (!profile) {return;}
    return (
      <div class="profile-page">
        <div class="user-info">
          <div class="container">
            <div class="row">
              <div class="col-xs-12 col-md-10 offset-md-1">
                <img src={profile.image} class="user-img" />
                <h4>{profile.username}</h4>
                <p>{profile.bio}</p>
                <button
                  class="btn btn-sm btn-outline-secondary action-btn"
                  onclick={() => app.run('/toggle-follow', profile, this)}>
                  {profile.following ? (
                    <span>
                      <i class="ion-minus-round"></i> Unfollow {profile.username}
                    </span>
                  ) : (
                    <span>
                      <i class="ion-plus-round"></i> Follow {profile.username}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
              <div class="articles-toggle">
                <ul class="nav nav-pills outline-active">
                  <li class="nav-item">
                    <a
                      class={`nav-link ${state.type === 'articles' ? 'active' : ''}`}
                      href={`#/profile/${profile.username}/articles/1`}>
                      My Articles
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={`nav-link ${state.type === 'favorites' ? 'active' : ''}`}
                      href={`#/profile/${profile.username}/favorites/1`}>
                      Favorited Articles
                    </a>
                  </li>
                </ul>
              </div>
              <Articles articles={state.articles} component={this} />
              <Pages
                max={Math.floor(state.max / PAGE_SIZE)}
                selected={state.page}
                link={`#/profile/${state.profile.username}/${state.type}`}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  updateState = async (state, name, type, page) => {
    name = decodeURIComponent(name || state.name);
    type = type || state.type;
    page = parseInt(page) || state.page;
    let newState = state;
    if (name !== state.name) {
      const profileResult = await profile.get(name);
      newState = { ...newState, profile: profileResult.profile };
    }
    if (name !== state.name || type !== state.type || page !== state.page) {
      const limit = PAGE_SIZE;
      const offset = (page - 1) * limit;
      const articleResult =
        type === 'favorites'
          ? await articles.search({ favorited: name, offset, limit })
          : await articles.search({ author: name, offset, limit });
      newState = {
        ...newState,
        name,
        type,
        page,
        articles: articleResult.articles,
        max: articleResult.articlesCount
      };
    }
    return newState;
  };

  @on('#/profile') root = (state, name, type, page) => this.updateState(state, name, type, page);

  @on('update-article') updateArticle = (state, article) => {
    state.articles = state.articles.map((a) => {
      return a.slug === article.slug ? article : a;
    });
    return state;
  };

  @on('update-follow') updateFollow = (state, profile) => ({ ...state, profile });
}

export default new ProfileComponent().mount('my-app');
