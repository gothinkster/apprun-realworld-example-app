import app from 'apprun';

import home from './home';
import signin from './signin';
import register from './register';
import profile from './profile';
import settings from './settings';
import create from './create';
import edit from './edit';
import article from './article';

import './events';

const element = document.getElementById('my-app');
new home().start(element);
new signin().mount(element);
new register().mount(element);
new profile().mount(element);
new settings().mount(element);
new create().mount(element);
new edit().mount(element);
new article().mount(element);
