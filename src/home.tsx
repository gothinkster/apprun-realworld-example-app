import app, { Component } from 'apprun';
import { IArticle, tags, articles } from './api';

const Tag = ({ tag }) => <a href="" className="tag-pill tag-default">{tag}</a>

const Article = (props) => {
  const article = props.article as IArticle;
  // console.log(article)
  return <div className="article-preview">
    <div className="article-meta">
      <a href="profile.html"><img src={article.author.image} /></a>
      <div className="info">
        <a href="" className="author">{article.author.username}</a>
        <span className="date">{article.updatedAt}</span>
      </div>
      <button className="btn btn-outline-primary btn-sm pull-xs-right">
        <i className="ion-heart"></i> {article.favoritesCount}
      </button>
    </div>
    <a href={`#article/${article.slug}`} className="preview-link">
      <h1>{article.title}</h1>
      <p>{article.description}</p>
      <span>Read more...</span>
    </a>
  </div>
}

class homeComponent extends Component {
  state = {
    type: '',
    articles: [],
    tags: []
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
                  <a className={`nav-link ${state.user ? '' : 'disabled'} ${state.type ? 'active' : ''}`}
                    href="#/feed">Your Feed</a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${state.type ? '' : 'active'}`} href="#">Global Feed</a>
                </li>
              </ul>
            </div>
            { state.articles.length
              ? state.articles.map(article => <Article article={article}></Article>)
              : <div className="article-preview">No articles are here... yet.</div>
            }
          </div>
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <div className="tag-list">
                {state.tags.map(tag => <Tag tag={tag}></Tag>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }

  update = {
    '#': async (state, type) => {

      let tagList = state.tags.length
        ? { tags: state.tags }
        : await tags.all();

      const feed = (type === 'feed')
        ? await articles.feed({ limit: 10, offset: 0 })
        : await articles.search({ limit: 10, offset: 0 });

      return { ...this.state, type, tags: tagList.tags, articles: feed.articles }
    },
    '#user': (state, user) => ({ ...state, user })
  }
}

new homeComponent().mount('my-app')

