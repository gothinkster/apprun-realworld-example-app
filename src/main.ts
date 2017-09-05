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

app.on('//', _ => { })

let _user;
function setCurrentUser(user: IUser = null) {
  _user = user;
  setToken(user ? user.token : null);
  app.run('#user', user)
}

app.on('#', async (route, ...p) => {
  if (!_user) {
    try {
      const current = await auth.current();
      _user = current.user;
    } catch (ex) {
      // console.log('no current user')
    }
    setCurrentUser(_user);
  }

  if (!route) document.location.hash = '#/';
  app.run(`#/${route || ''}`, ...p);
})

app.on('#/signout', _ => {
  setCurrentUser();
  document.location.hash = '#/';
})

app.on('sign-in', async e => {
  try {
    e.preventDefault();
    const session = await auth.signIn(serializeObject(e.target));
    setCurrentUser(session.user);
    if (document.location.hash === '#/login') document.location.hash = '#/feed';
  } catch (errors) {
    app.run('#/login', errors)
  }
})

app.on('register', async e => {
  try {
    e.preventDefault();
    const session = await auth.register(serializeObject(e.target));
    setCurrentUser(session.user);
    document.location.hash = '#';
  } catch (errors) {
    app.run('#/register', errors)
  }
})

