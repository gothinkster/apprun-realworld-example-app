import app, { Component } from 'apprun';
import { articles, comments } from '../api';
import { IArticle } from '../models';
import Comments from './comment-list';

class articleComponent extends Component {
  state = {
    article: null,
    comments: []
  }

  view = (state) => {
    const article = state.article as IArticle;
    if (!article) return;
    return <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <div className="article-meta">
            <a href=""><img src={article.author.image} /></a>
            <div className="info">
              <a href="" className="author">{article.author.username}</a>
              <span className="date">{new Date(article.updatedAt).toLocaleString()}</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary"
              onclick={e => app.run('#toggle-follow', article.author, 'on-article')}>
              {article.author.following
                ? <span><i className="ion-minus-round"></i> Unfollow {article.author.username}</span>
                : <span><i className="ion-plus-round"></i> Follow {article.author.username}</span>
              }
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary"
              onclick={e => app.run('#toggle-fav-article', article, 'article')}>
              <i className="ion-heart"></i>
              &nbsp; Favorite Post <span className="counter">({article.favoritesCount})</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article.body}</p>
            <div class="tag-list"><br />
              {article.tagList.map(tag =>
                <li className="tag-default tag-pill tag-outline">
                  <a href={`#/tag/${tag}`}>{tag} </a>
                </li>
              )}
            </div>
          </div>
        </div>
        <hr />
        <Comments comments={state.comments}/>
      </div>
    </div>
  }

  update = {
    '#/article': async (state, slug) => {
      let article = state.article as IArticle;
      let _comments = state.comments;
      if (!article || article.slug !== slug) {
        const result = await articles.get(slug);
        article = result.article;
        const commentsResponse = await comments.forArticle(article.slug);
        _comments = commentsResponse.comments;
      }
      return { ...state, article, comments: _comments }
    },
    '#new-comment': async (state, e) => {
      try {
        e.preventDefault();
        const comment = e.target['comment'].value;
        await comments.create(state.article.slug, { body: comment });
        const commentsResponse = await comments.forArticle(state.article.slug);
        const _comments = commentsResponse.comments;
        return { ...state, comments: _comments }
      } catch ({ errors }) {
        return { ...state, errors }
      }
    },
    '#update-article': (state, article) => {
      return { ...state, article };
    },
    '#update-follow-on-article': (state, author) => {
      return { ...state, article: { ...state.article, author } };
    }
  }
}

new articleComponent().mount('my-app')

