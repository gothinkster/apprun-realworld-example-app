import app, { Component } from 'apprun';
import { auth, serializeObject, setToken } from '../api'
import { IProfile } from '../models';
import Errors from './error-list';

class signinComponent extends Component {
  state = {}

  view = (state) => {
    if (!state || state instanceof Promise) return;

    return <div className="auth-page">
      <div className="container page">
        <div className="row">

          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign In</h1>
            <p className="text-xs-center">
              <a href="#/register">Need an account?</a>
            </p>

            {state.errors && <Errors errors={state.errors} />}

            <form onsubmit={e => this.run('sign-in', e)}>
              <fieldset className="form-group">
                <input className="form-control form-control-lg" type="text" placeholder="Email" name="email"/>
              </fieldset>
              <fieldset className="form-group">
                <input className="form-control form-control-lg" type="password" placeholder="Password" name="password" />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                Sign In
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  }

  update = {
    '#/login': state => ({ ...state, messages:[], returnTo: document.location.hash }),
    '#/logout': state => {
      app.run('#user', null);
      document.location.hash = '#/';
    },
    'sign-in': async (state, e) => {
      let user;
      try {
        e.preventDefault();
        const session = await auth.signIn(serializeObject(e.target));
        app.run('#user', session.user);
        if (!state.returnTo || state.returnTo === '#/login')
          document.location.hash = '#/feed';
        else
          app.run('route',state.returnTo);
      } catch ({ errors }) {
        return { ...state, errors }
      }
    },
  }
}

app.on('#user', user => {
  setToken(user ? user.token : null);
  app['user'] = user;
});

new signinComponent().mount('my-app')