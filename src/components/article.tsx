import app, { Component } from 'apprun';
import { articles, comments } from '../api';
import { IArticle } from '../models';
import Comments from './comment-list';
import * as marked from 'marked';

class ArticleComponent extends Component {
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
            <a href={article.author.image} ><img src={article.author.image} /></a>
            <div className="info">
              <a href={`#/profile/${article.author.username}`} className="author">
                {article.author.username}
              </a>
              <span className="date">{new Date(article.updatedAt).toLocaleString()}</span>
            </div>

            {app['user'] && app['user'].username === article.author.username
              ?<span>
                <button className="btn btn-sm btn-outline-secondary"
                  onclick={e => app.run('#edit-article', article)}>
                  <i className="ion-edit"></i>&nbsp; Edit Article
              </button>&nbsp;&nbsp;
              <button className="btn btn-sm btn-outline-danger"
                  onclick={e => app.run('#delete-article', article)}>
                  <i className="ion-trash-o"></i>&nbsp; Delete Article
              </button>
              </span>

              : <span>
                <button className="btn btn-sm btn-outline-secondary"
                  onclick={e => app.run('#toggle-follow', article.author, 'on-article')}>
                  {article.author.following
                    ? <span><i className="ion-minus-round"></i> Unfollow {article.author.username}</span>
                    : <span><i className="ion-plus-round"></i> Follow {article.author.username}</span>
                  }
                </button> &nbsp;&nbsp;
                <button className="btn btn-sm btn-outline-primary"
                  onclick={e => app.run('#toggle-fav-article', article, 'article')}>
                  <i className="ion-heart"></i>
                  &nbsp; Favorite Post <span className="counter">({article.favoritesCount})</span>
                </button>
              </span>
            }
                  
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{`_html:${marked(article.body, { sanitize: true })}`}</p>
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
        return { ...state, comments: commentsResponse.comments }
      } catch ({ errors }) {
        return { ...state, errors }
      }
    },
    '#update-article': (state, article) => {
      return { ...state, article };
    },
    '#update-follow-on-article': (state, author) => {
      return { ...state, article: { ...state.article, author } };
    },
    '#delete-comment': async (state, comment) => {
      await comments.delete(this.state.article.slug, comment.id);
      const commentsResponse = await comments.forArticle(state.article.slug);      
      return { ...state, comments: commentsResponse.comments }      
    }
  }
}

app.on('#edit-article', article => {
  document.location.hash = `#/editor/${article.slug}`;
})

app.on('#delete-article', article => {
  articles.delete(article.slug);
  document.location.hash = '#/';
})

export default new ArticleComponent().mount('my-app')

