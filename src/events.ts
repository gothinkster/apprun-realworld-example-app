import app from 'apprun'
import { getTags, getArticles, getCurrentUser } from './api';
import { setToken } from './fetch';

app.on('//', _ => {})

app.on('#', async _ => {
  const feed = await getArticles({ limit: 10, offset: 0 })
  const tags = await getTags();
  app.run('#articles', feed.articles);
  app.run('#tags', tags.tags);

  try {
    const user = await getCurrentUser();
    console.log(user)
    setToken(user.token);
    app.run('#user', user)
  } catch (ex) {
    console.log('no current user')
  }
})
