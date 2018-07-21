import app from 'apprun';

import './components/header';
import './components/home';
import './components/signin';
import './components/register';
import './components/profile';
import './components/settings';
import './components/editor';
import './components/article';

app.on('#', (route, ...p) => {
  app.run(`#/${route || ''}`, ...p);
})

app.run('/get-user');