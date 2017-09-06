import app, { Component } from 'apprun';
import { articles } from './api';
import { IArticle } from './models';
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

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form">
              <div className="card-block">
                <textarea className="form-control" placeholder="Write a comment..." rows="3"></textarea>
              </div>
              <div className="card-footer">
                <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                <button className="btn btn-sm btn-primary">
                  Post Comment
                </button>
              </div>
            </form>

            {/* <div className="card">
              <div className="card-block">
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              </div>
              <div className="card-footer">
                <a href="" className="comment-author">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                </a>
                &nbsp;
                <a href="" className="comment-author">Jacob Schmidt</a>
                <span className="date-posted">Dec 29th</span>
              </div>
            </div> */}

          </div>
        </div>
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

