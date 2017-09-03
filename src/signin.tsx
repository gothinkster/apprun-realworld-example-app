import app, { Component } from 'apprun';

export default class signinComponent extends Component {
  state = {
    returnTo: '#',
    message: []
  }

  view = (state) => {

    return <div className="auth-page">
      <div className="container page">
        <div className="row">

          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign In</h1>
            <p className="text-xs-center">
              <a href="#register">Need an account?</a>
            </p>

            {state.messages && <ul className="error-messages">
              {state.messages.map(message =>
                <li>{message}</li>
              )}
            </ul>}

            <form onsubmit={e => app.run('sign-in', e, state.returnTo)}>
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
    '#signin': (state, returnTo, messages) => ({ ...state, returnTo, messages })
  }
}

