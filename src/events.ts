import app from 'apprun'
import { getTags, getArticles } from './api';

app.on('//', _ => {})

app.on('#', async _ => {
  const feed = await getArticles({ limit: 10, offset: 0 })
  const tags = await getTags();
  app.run('#articles', feed.articles)
  app.run('#tags', tags.tags)
})
