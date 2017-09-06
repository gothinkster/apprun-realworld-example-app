import app from 'apprun';
import { auth } from './api'

import './components/header';
import './components/home';
import './components/signin';
import './components/register';
import './components/profile';
import './components/settings';
import './components/editor';
import './components/article';

app.on('//', _ => { })

app.on('#', async (route, ...p) => {
  let user = app['user'];
  if (!user) {
    try {
      const current = await auth.current();
      user = current.user;
    } catch (ex) {
    }
    app.run('#user', user);
  }
  if (!route && !p.length) document.location.hash = '#/';
  app.run(`#/${route || ''}`, ...p);
})
