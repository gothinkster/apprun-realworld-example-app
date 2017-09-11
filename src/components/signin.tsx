import app, { Component, on } from 'apprun';
import { auth, serializeObject, setToken } from '../api'

import Errors from './error-list';

class SigninComponent extends Component {
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
                <input className="form-control form-control-lg" type="text" placeholder="Email" name="email" />
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

  @on('#/login') login = state => ({ ...state, messages: [], returnTo: document.location.hash })
  
  @on('#/logout') logout = state => {
    app.run('#user', null);
    document.location.hash = '#/';
  }
  
  @on('sign-in') signIn = async (state, e) => {
    try {
      e.preventDefault();
      const session = await auth.signIn(serializeObject(e.target));
      app.run('#user', session.user);
      const returnTo: string = (state.returnTo || '').replace(/\#\/login\/?/, '')
      if (!returnTo)
        document.location.hash = '#/feed';
      else {
        app.run('route', returnTo);
        history.pushState(null, null, returnTo);
      }
    } catch ({ errors }) {
      return { ...state, errors }
    }
  }
 
  @on('#user') setUser = (state, user) => {
    setToken(user ? user.token : null);
    app['user'] = user;
  }
}  

export default new SigninComponent().mount('my-app')