import app from 'apprun'
import { getTags, getArticles, auth } from './api';
import { serializeObject, setToken } from './fetch';

function setCurrentUser(user = null) {
  setToken(user ? user.token : null);
  app.run('#user',user)
}

app.on('//', _ => {})

app.on('#', async _ => {
  const feed = await getArticles({ limit: 10, offset: 0 })
  const tags = await getTags();
  app.run('#articles', feed.articles);
  app.run('#tags', tags.tags);

  try {
    const current = await auth.current();
    setCurrentUser(current.user);
  } catch (ex) {
    console.log('no current user')
  }
})

app.on('#signout', _ => {
  setCurrentUser();
  document.location.hash = '#';
})

app.on('sign-in', async e => {
  try {
    e.preventDefault();
    const current = await auth.signIn(serializeObject(e.target));
    setCurrentUser(current.user);
    if (document.location.hash === '#signin') document.location.hash = '#';
  } catch (errors) {
    app.run('#signin', errors)
  }
})

app.on('register', async e => {
  try {
    e.preventDefault();
    const current = await auth.register(serializeObject(e.target));
    setCurrentUser(current.user);
    document.location.hash = '#';
  } catch (errors) {
    app.run('#register', errors)
  }
})
