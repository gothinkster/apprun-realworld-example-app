import app, { Component, on } from 'apprun';
import { articles, comments } from '../api';
import { IArticle } from '../models';
import Comments from './comment-list';
import Modal from './modal';
import * as marked from 'marked';

function ArticleMeta({ article }: { article: IArticle }) {
  const favClass = article.favorited ? "btn-primary" : "btn-outline-primary";
  const followClass = article.author.following ? "btn-secondary" : "btn-outline-secondary";
  return <div className="article-meta">
    <a href={article.author.image} ><img src={article.author.image} /></a>
    <div className="info">
      <a href={`#/profile/${article.author.username}`} className="author">
        {article.author.username}
      </a>
      <span className="date">{new Date(article.updatedAt).toLocaleString()}</span>
    </div>

    {app['user'] && app['user'].username === article.author.username
      ? <span>
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
        <button className={`btn btn-sm ${followClass}`}
          onclick={e => app.run('#toggle-follow', article.author, 'article')}>
          {article.author.following
            ? <span><i className="ion-minus-round"></i> Unfollow {article.author.username}</span>
            : <span><i className="ion-plus-round"></i> Follow {article.author.username}</span>
          }
        </button> &nbsp;&nbsp;
        <button className={`btn btn-sm ${favClass}`}
          onclick={e => app.run('#toggle-fav-article', article, 'article')}>
          <i className="ion-heart"></i>
          &nbsp; Favorite Post <span className="counter">({article.favoritesCount})</span>
        </button>
      </span>
    }
  </div>
}

class ArticleComponent extends Component {
  state = {
    article: null,
    comments: []
  }

  view = (state) => {
    const article = state.article as IArticle;
    if (!article) return;

    return <div className="article-page">

      {
        state.deleting ? <Modal title='Delete Article'
        body='Are you sure you want to delete this article?'
        ok='Delete' cancel='No'
        onOK={e => this.run('ok-delete-article', e)}
        onCancel={e => this.run('cancel-delete-article', e)} /> : ''
      }

      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <ArticleMeta article={article} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{`_html:${marked(article.body, { sanitize: true })}`}</p>
            <div className="tag-list"><br />
              {article.tagList.map(tag =>
                <li className="tag-default tag-pill tag-outline">
                  <a href={`#/tag/${tag}`}>{tag} </a>
                </li>
              )}
            </div>
          </div>
        </div>
        <hr />
        <div className="article-actions">
          <ArticleMeta article={article} />
        </div>
        <Comments comments={state.comments} />
      </div>
    </div>
  }

  @on('#/article') root = async (state, slug) => {
    let article = state.article as IArticle;
    let _comments = state.comments;
    if (!article || article.slug !== slug) {
      const result = await articles.get(slug);
      article = result.article;
      const commentsResponse = await comments.forArticle(article.slug);
      _comments = commentsResponse.comments;
    }
    return { ...state, article, comments: _comments }
  }

  @on('#new-comment') newComment = async (state, e) => {
    try {
      e.preventDefault();
      const comment = e.target['comment'].value;
      await comments.create(state.article.slug, { body: comment });
      const commentsResponse = await comments.forArticle(state.article.slug);
      return { ...state, comments: commentsResponse.comments }
    } catch ({ errors }) {
      return { ...state, errors }
    }
  }

  @on('#update-article') updateArticle = (state, article, id) => {
    state.article = article;
    return id === 'article' ? state : null;
  }

  @on('#update-follow') updateFollow = (state, author, id) => {
    state.article.author = author;
    return id === 'article' ? state : null;
  }

  @on('#delete-comment') deleteComment = async (state, comment) => {
    await comments.delete(this.state.article.slug, comment.id);
    const commentsResponse = await comments.forArticle(state.article.slug);
    return { ...state, comments: commentsResponse.comments }
  }

  @on('#toggle-fav-article') toggleFavArticle = async (state, article: IArticle, id: string) => {
    if (!app['user']) return app.run('#/login');
    const result = article.favorited
      ? await articles.unfavorite(article.slug)
      : await articles.favorite(article.slug);
    app.run(`#update-article`, result.article, id)
  }

  @on('#edit-article') editArticle = (state, article) => {
    document.location.hash = `#/editor/${article.slug}`;
  }

  @on('#delete-article') deleteArticle = (state, article) => ({ ...state, deleting: true })

  @on('ok-delete-article') okDelete = (state, e) => {
    articles.delete(state.article.slug);
    document.location.hash = '#/';
    return ({ ...state, deleting: false })
  }

  @on('cancel-delete-article') cancelDelete = (state, article) => ({ ...state, deleting: false })

}

export default new ArticleComponent().mount('my-app')

