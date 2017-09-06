import app from 'apprun';
import { IArticle } from '../models';

function Article(props) {
  const article = props.article as IArticle;
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
    <a href={`#/article/${article.slug}`} className="preview-link">
      <h1>{article.title}</h1>
      <p>{article.description}</p>
      <span>Read more...</span>
    </a>
    <ul class="tag-list">
      {article.tagList.map(tag =>
        <li className="tag-default tag-pill tag-outline"> {tag} </li>
      )}
    </ul>
  </div>
}

export default function ({ articles }: { articles: Array<IArticle>}) {
  return articles.length
  ? articles.map(article => <Article article={article}></Article>)
  : <div className="article-preview">No articles are here... yet.</div>
}