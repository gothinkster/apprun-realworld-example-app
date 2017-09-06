import app, {Component} from 'apprun';
import { auth, serializeObject } from '../api'
import Errors from './error-list';

class registerComponent extends Component {
  state = {}

  view = (state) => {
    if (!state || state instanceof Promise) return;

    return <div className="auth-page">
      <div className="container page">
        <div className="row">

          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <a href="#/login">Have an account?</a>
            </p>

            {state.errors && <Errors errors={state.errors} />}

            <form onsubmit={e => this.run('register', e)}>
              <fieldset className="form-group">
                <input className="form-control form-control-lg" type="text" placeholder="Your Name" name="username"/>
              </fieldset>
              <fieldset className="form-group">
                <input className="form-control form-control-lg" type="text" placeholder="Email" name="email"/>
              </fieldset>
              <fieldset className="form-group">
                <input className="form-control form-control-lg" type="password" placeholder="Password" name="password"/>
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                Sign up
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  }

  update = {
    '#/register': (state, messages) => ({ ...state, messages }),
    'register': async (state, e) => {
      try {
        e.preventDefault();
        const session = await auth.register(serializeObject(e.target));
        app.run('#user', session.user);
        app.run('route', '#/');
      } catch ({ errors }) {
        return { ...state, errors }
      }
    }
  }
}

new registerComponent().mount('my-app')
