import app from 'apprun';
import { IArticle } from '../models';

function Article(props) {
  const article = props.article as IArticle;
  return <div className="article-preview">
    <div className="article-meta">
      <a href={article.author.image} ><img src={article.author.image} /></a>
      <div className="info">
        <a href={`#/profile/${article.author.username}`} className="author">
          {article.author.username}
        </a>
        <span className="date">{ new Date(article.updatedAt).toLocaleString() }</span>
      </div>
      <button className="btn btn-outline-primary btn-sm pull-xs-right"
        onclick={e => app.run('#toggle-fav-article', article, props.id)}>
        <i className="ion-heart"></i> {article.favoritesCount}
      </button>
    </div>
    <a href={`#/article/${article.slug}`} className="preview-link">
      <h1>{article.title}</h1>
      <p>{article.description}</p>
      <span>Read more...</span>
    </a>
    <div class="tag-list"><br/>
      {article.tagList.map(tag =>
        <li className="tag-default tag-pill tag-outline">
          <a href={`#/tag/${tag}`}>{tag} </a>
        </li>
      )}
      </div>
  </div>
}

export default function ({ articles, id }: { articles: Array<IArticle>, id?: string }) {
  return articles.length
    ? articles.map(article => <Article article={article} id={id}></Article>)
    : <div className="article-preview">No articles are here... yet.</div>
}