import app from 'apprun';
import { tags, articles, auth, IUser } from './api';
import { serializeObject, setToken } from './fetch';

import './header';
import './home';
import './signin';
import './register';
import './profile';
import './settings';
import './create';
import './edit';
import './article';

function setCurrentUser(user: IUser = null) {
  setToken(user ? user.token : null);
  app.run('#user', user)
}

app.on('//', _ => { })

app.on('#', async _ => {
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
    const session = await auth.signIn(serializeObject(e.target));
    setCurrentUser(session.user);
    if (document.location.hash === '#signin') document.location.hash = '#';
  } catch (errors) {
    app.run('#signin', errors)
  }
})

app.on('register', async e => {
  try {
    e.preventDefault();
    const session = await auth.register(serializeObject(e.target));
    setCurrentUser(session.user);
    document.location.hash = '#';
  } catch (errors) {
    app.run('#register', errors)
  }
})

