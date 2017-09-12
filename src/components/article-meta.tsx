import app from 'apprun';
import { IArticle } from '../models';

export default
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
