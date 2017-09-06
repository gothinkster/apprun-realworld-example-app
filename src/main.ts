import app from 'apprun';
import { auth } from './api'

import './header';
import './home';
import './signin';
import './register';
import './profile';
import './settings';
import './editor';
import './article';

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
  if (!route) document.location.hash = '#/';
  app.run(`#/${route || ''}`, ...p);
})
