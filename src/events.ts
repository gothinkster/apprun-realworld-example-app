import app from 'apprun'
import { getArticles } from './api';

app.on('//', _ => {})

app.on('#', async _ => {
  const ret = await getArticles({ limit: 10, offset: 0 })
  app.run('#articles', ret.articles)
})
