import app, { Component } from 'apprun';
import { tags, articles } from '../api';
import Articles from './article-list';
import Pages from './page-list';

const PAGE_SIZE = 10
const Tag = ({ tag }) => <a href="" className="tag-pill tag-default">{tag}</a>

class homeComponent extends Component {
  state = {
    type: '',
    articles: [],
    tags: [],
    max: 1,
    page: 1
  };

  view = (state) => {
    if (state instanceof Promise) return;
    return <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className={`nav-link ${app['user'] ? '' : 'disabled'} ${state.type==='feed' ? 'active' : ''}`}
                    href="#/feed">Your Feed</a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${state.type==='' ? 'active' : ''}`} href="#/">Global Feed</a>
                </li>
                {state.tag ?
                  <li className="nav-item">
                    <a className={`nav-link ${state.type === 'tag' ? 'active' : ''}`} href={`#/tag/${state.tag}`}>#{state.tag}</a>
                  </li>
                  : ''
                }
              </ul>
            </div>
            <Articles articles={state.articles} />
            <Pages max={Math.floor(state.max / PAGE_SIZE)} selected={state.page} onpage={page => this.run('set-page', page)}/>
          </div>
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <div className="tag-list" onclick={e => this.run('set-page', 1, e)}>
                {state.tags.map(tag => <Tag tag={tag} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }

  getArticles = async (state, type: '' | 'feed' | 'tag', page, tag?: string) => {
    let tagList = state.tags.length
      ? { tags: state.tags }
      : await tags.all();

    page = parseInt(page) || 1;
    tag = tag || state.tag;
    const limit = PAGE_SIZE;
    const offset = (page - 1) * PAGE_SIZE;
    let feed;
    switch (type) {
      case 'feed':
        feed = await articles.feed({ limit, offset });
        break;
      case 'tag':
        feed = await articles.search({tag, limit, offset });
        break;
      default:
        feed = await articles.search({ limit, offset });
        break;
    }
    return {
      ...state,
      tags: tagList.tags,
      type,
      articles: feed.articles,
      max: feed.articlesCount,
      page: page,
      tag
    }
  }

  update = {
    '#/': async (state, page) => {
      return await this.getArticles(state, '', page)
    },
    '#/feed': async (state, page) => {
      return await this.getArticles(state, 'feed', page)
    },
    '#/tag': async (state, tag, page) => {
      return await this.getArticles(state, 'tag', page, tag)
    },
    'set-page': async (state, page) => {
      const t = state.type === 'tag' && state.tag ? `/${state.tag}` : '';
      history.pushState(null, null, `#/${state.type}${t}/${page}`);
      return await this.getArticles(state, state.type, page, state.tag);
    },
    '#update-article': (state, article) => {
      // ?
      const articles = state.articles.map(a => {
        return a.slug === article.slug ? article : a;
      })
      return { ...state, articles };
    }
  }
}

app.on('#toggle-fav-article', async article => {
  const result = article.favorited
    ? await articles.unfavorite(article.slug)
    : await articles.favorite(article.slug);
  app.run('#update-article', result.article)
})

new homeComponent().mount('my-app')

