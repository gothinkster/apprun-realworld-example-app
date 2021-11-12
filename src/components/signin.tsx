import app, { Component, on } from 'apprun';
import { auth, serializeObject } from '../api';

import Errors from './error-list';

class SigninComponent extends Component {
  state = {};

  view = (state) => {
    if (!state || state instanceof Promise) {return;}
    return (
      <div class="auth-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">Sign In</h1>
              <p class="text-xs-center">
                <a href="#/register">Need an account?</a>
              </p>

              {state.errors && <Errors errors={state.errors} />}

              <form $onsubmit='sign-in'>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    name="email"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">Sign In</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  @on('#/login') login = state => !auth.authorized() ? { ...state, messages: [], returnTo: document.location.hash } : null;
  @on('#/logout') logout = () => {
    app.run('/set-user', null);
    document.location.hash = '#/';
  };

  @on('sign-in') signIn = async (state, e) => {
    try {
      e.preventDefault();
      const session = await auth.signIn(serializeObject(e.target));
      app.run('/set-user', session.user);
      const returnTo: string = (state.returnTo || '').replace(/#\/login\/?/, '');
      if (!returnTo) {document.location.hash = '#/feed';} else {
        app.run('route', returnTo);
        history.pushState(null, null, returnTo);
      }
    } catch ({ errors }) {
      return { ...state, errors };
    }
  };
}

export default new SigninComponent().mount('my-app');
