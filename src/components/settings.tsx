import app, { Component } from 'apprun';
import { serializeObject, auth } from '../api'
import Errors from './error-list';
class settingsComponent extends Component {
  state = {}

  view = (state) => {
    if (!app['user']) return;
    const user = app['user'];
    return <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            {state.errors && <Errors errors={state.errors} />}
            <h1 className="text-xs-center">Your Settings</h1>
            <form onsubmit={e => this.run('submit-settings', e)}>
              <fieldset>
                <fieldset className="form-group">
                  <input className="form-control" type="text" placeholder="URL of profile picture"
                    name='image' value={user.image} />
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="text" placeholder="Your Name"
                    name='username' value={user.username}/>
                </fieldset>
                <fieldset className="form-group">
                  <textarea className="form-control form-control-lg" rows="8" placeholder="Short bio about you">
                    {user.bio}
                  </textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="text" placeholder="Email"
                    name='email' value={user.email}/>
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="password" placeholder="Password"
                    name='password' value={user.password}/>
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
              </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  }

  update = {
    '#/settings': state => {
      if (!app['user']) app.run('#/login');
      return {}
    },
    'submit-settings': async (state, e) => {
      try {
        e.preventDefault();
        const user = serializeObject<any>(e.target);        
        const result = await auth.save(user);
        app.run('#user', result.user);
        return {}
      } catch ({ errors }) {
        return { ...state, errors }
      }
    }
  }
}

new settingsComponent().mount('my-app')