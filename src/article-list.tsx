import app from 'apprun';
import { IArticle } from './api';
import Article from './article-preview';

export default function ({ articles }: { articles: Array<IArticle>}) {
  return articles.length
  ? articles.map(article => <Article article={article}></Article>)
  : <div className="article-preview">No articles are here... yet.</div>
}