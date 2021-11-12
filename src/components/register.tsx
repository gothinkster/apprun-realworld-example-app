import app, { Component, on } from 'apprun';
import { auth, serializeObject } from '../api';
import Errors from './error-list';

class RegisterComponent extends Component {
  state = {};

  view = (state) => {
    if (!state || state instanceof Promise) {return;}
    return (
      <div class="auth-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">Sign Up</h1>
              <p class="text-xs-center">
                <a href="#/login">Have an account?</a>
              </p>

              {state.errors && <Errors errors={state.errors} />}

              <form $onsubmit='register'>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    name="username"
                  />
                </fieldset>
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
                <button class="btn btn-lg btn-primary pull-xs-right">Sign up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  @on('#/register') register = (state, messages) => !auth.authorized() ? { ...state, messages } : null;

  @on('register') submitRegistration = async (state, e) => {
    try {
      e.preventDefault();
      const session = await auth.register(serializeObject(e.target));
      app.run('/set-user', session.user);
      app.run('route', '#/');
    } catch ({ errors }) {
      return { ...state, errors };
    }
  };
}

export default new RegisterComponent().mount('my-app');
