import app, { Component } from 'apprun';
import { articles } from '../api';
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
              <span className="date">{article.updatedAt}</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp; Follow {article.author.username} <span className="counter">(10)</span>
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp; Favorite Post <span className="counter">(29)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container page">

        <div className="row article-content">
          <div className="col-md-12">
            {article.body}
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <a href="profile.html"><img src={article.author.image} /></a>
            <div className="info">
              <a href="" className="author">{article.author.username}</a>
              <span className="date">January 20th</span>
            </div>

            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp; Follow {article.author.username} <span className="counter">(10)</span>
            </button>
            &nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp; Favorite Post <span className="counter">(29)</span>
            </button>
          </div>
        </div>
        <Comments />
      </div>
    </div>
  }

  update = {
    '#/article': async (state, slug) => {
      let article = state.article;
      if (!article || article.slug !== slug) {
        const result = await articles.get(slug);
        article = result.article;
        console.log(article)
      }
      return { ...state, article }
    }
  }
}

new articleComponent().mount('my-app')

