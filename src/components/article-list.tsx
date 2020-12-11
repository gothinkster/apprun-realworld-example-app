import app from 'apprun';
import { IArticle } from '../models';

function Article(props) {
  const article = props.article as IArticle;
  const favClass = article.favorited ? 'btn-primary' : 'btn-outline-primary';
  return (
    <div class="article-preview">
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
        <button
          class={`btn btn-sm pull-xs-right ${favClass}`}
          $onclick={['/toggle-fav-article', article, props.component]}>
          <i class="ion-heart"></i> {article.favoritesCount}
        </button>
      </div>
      <a href={`#/article/${article.slug}`} class="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul class="tag-list">
          {article.tagList.map(tag => (
            <li class="tag-default tag-pill tag-outline">
              <a href={`#/tag/${tag}`}>{tag} </a>
            </li>
          ))}
        </ul>
      </a>
    </div>
  );
}

export default function ({ articles, component }: { articles: Array<IArticle>; component }) {
  return articles.length ? (
    articles.map(article => <Article article={article} component={component}></Article>)
  ) : (
    <div class="article-preview">No articles are here... yet.</div>
  );
}
