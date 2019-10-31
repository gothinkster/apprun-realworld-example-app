import app from 'apprun';
import { IArticle } from '../models';

export default function ArticleMeta({ article, component }: { article: IArticle; component }) {
  const favClass = article.favorited ? 'btn-primary' : 'btn-outline-primary';
  const followClass = article.author.following ? 'btn-secondary' : 'btn-outline-secondary';
  return (
    <div class="article-meta">
      <a href={article.author.image}>
        <img src={article.author.image} />
      </a>
      <div class="info">
        <a href={`#/profile/${article.author.username}`} class="author">
          {article.author.username}
        </a>
        <span class="date">{new Date(article.updatedAt).toLocaleString()}</span>
      </div>

      {app['user'] && app['user'].username === article.author.username ? (
        <span>
          <button
            class="btn btn-sm btn-outline-secondary"
            onclick={e => component.run('edit-article', article)}>
            <i class="ion-edit"></i>&nbsp; Edit Article
          </button>
          &nbsp;&nbsp;
          <button
            class="btn btn-sm btn-outline-danger"
            onclick={e => component.run('delete-article', article)}>
            <i class="ion-trash-o"></i>&nbsp; Delete Article
          </button>
        </span>
      ) : (
        <span>
          <button
            class={`btn btn-sm ${followClass}`}
            onclick={e => app.run('/toggle-follow', article.author, component)}>
            {article.author.following ? (
              <span>
                <i class="ion-minus-round"></i> Unfollow {article.author.username}
              </span>
            ) : (
              <span>
                <i class="ion-plus-round"></i> Follow {article.author.username}
              </span>
            )}
          </button>{' '}
          &nbsp;&nbsp;
          <button
            class={`btn btn-sm ${favClass}`}
            onclick={e => app.run('/toggle-fav-article', article, component)}>
            <i class="ion-heart"></i>
            &nbsp; Favorite Post <span class="counter">({article.favoritesCount})</span>
          </button>
        </span>
      )}
    </div>
  );
}
