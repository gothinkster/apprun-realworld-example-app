import app from 'apprun';
import { IArticle } from './models';
import Article from './article-preview';

export default function ({ articles }: { articles: Array<IArticle>}) {
  return articles.length
  ? articles.map(article => <Article article={article}></Article>)
  : <div className="article-preview">No articles are here... yet.</div>
}