import app, { Component, on } from 'apprun';
import { serializeObject, auth } from '../api'
import Errors from './error-list';
import Modal from './modal';

class SettingsComponent extends Component {
  state = {}

  view = (state) => {
    const user = state.user;
    if (!user) return;
    return <div className="settings-page">
      {
        state.showModal ? <Modal title='Confirmation'
          body='Your settings has been updated successfully.'
          ok='OK' cancel='Cancel'
          onOK={e => this.run('ok', e)}
          onCancel={e => this.run('cancel', e)} /> : ''
      }
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
                    name='username' value={user.username} />
                </fieldset>
                <fieldset className="form-group">
                  <textarea className="form-control form-control-lg" rows="8" placeholder="Short bio about you"
                    name='bio'>{user.bio}
                  </textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="text" placeholder="Email"
                    name='email' value={user.email} />
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="password" placeholder="Password"
                    name='password' value={user.password} />
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


  @on('#/settings') settings = state => {
    if (!auth.authorized()) return;
    return { user: app['user'] };
  }

  @on('submit-settings') submitSettings = async (state, e) => {
    try {
      e.preventDefault();
      const user = serializeObject<any>(e.target);
      const result = await auth.save(user);
      app.run('#user', result.user);
      return { showModal: true }
    } catch ({ errors }) {
      return { ...state, errors }
    }
  }

  @on('ok, cancel') ok = state => {
    return { showModel: false }
    //document.location.hash = `#/profile/${app['user'].username}`;
  }

}

export default new SettingsComponent().mount('my-app')