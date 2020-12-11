import app, { Component, on } from 'apprun';
import { serializeObject, auth } from '../api';
import Errors from './error-list';
import Modal from './modal';

class SettingsComponent extends Component {
  state = {};

  view = (state) => {
    const user = state.user;
    if (!user) {return;}
    return (
      <div class="settings-page">
        {state.showModal ? (
          <Modal
            title="Confirmation"
            body="Your settings has been updated successfully."
            ok="OK"
            cancel="Cancel"
            onOK={e => this.run('ok', e)}
            onCancel={e => this.run('cancel', e)}
          />
        ) : (
          ''
        )}
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              {state.errors && <Errors errors={state.errors} />}
              <h1 class="text-xs-center">Your Settings</h1>
              <form onsubmit={e => this.run('submit-settings', e)}>
                <fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="URL of profile picture"
                      name="image"
                      value={user.image}
                    />
                  </fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      name="username"
                      value={user.username}
                    />
                  </fieldset>
                  <fieldset class="form-group">
                    <textarea
                      class="form-control form-control-lg"
                      rows="8"
                      placeholder="Short bio about you"
                      name="bio">
                      {user.bio}
                    </textarea>
                  </fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={user.email}
                    />
                  </fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={user.password}
                    />
                  </fieldset>
                  <button class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  @on('#/settings') settings = () => {
    if (!auth.authorized()) {return;}
    return { user: app['user'] };
  };

  @on('submit-settings') submitSettings = async (state, e) => {
    try {
      e.preventDefault();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const user = serializeObject<any>(e.target);
      const result = await auth.save(user);
      app.run('#user', result.user);
      return { showModal: true };
    } catch ({ errors }) {
      return { ...state, errors };
    }
  };

  @on('ok, cancel') ok = () => {
    return { showModel: false };
  };
}

export default new SettingsComponent().mount('my-app');
