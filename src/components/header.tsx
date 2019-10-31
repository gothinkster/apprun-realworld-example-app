import app, { Component, on } from 'apprun';

class HeaderComponent extends Component {
  state = {};
  view = state => {
    const user = state.user;
    return (
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <a class="nav-link active" href="#/">
            Home
          </a>
        </li>
        {user && (
          <li class="nav-item">
            <a class="nav-link" href="#/editor">
              <i class="ion-compose"></i>&nbsp;New Post
            </a>
          </li>
        )}
        {user && (
          <li class="nav-item">
            <a class="nav-link" href="#/settings">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </a>
          </li>
        )}
        {user ? (
          ''
        ) : (
          <li class="nav-item">
            <a class="nav-link" href="#/login">
              Sign In
            </a>
          </li>
        )}
        {user ? (
          ''
        ) : (
          <li class="nav-item">
            <a class="nav-link" href="#/register">
              Sign Up
            </a>
          </li>
        )}
        {user && (
          <li class="nav-item">
            <a class="nav-link" href={`#/profile/${user.username}`}>
              {user.username}
            </a>
          </li>
        )}
        {user && (
          <li class="nav-item">
            <a class="nav-link" href="#/logout">
              Sign Out
            </a>
          </li>
        )}
      </ul>
    );
  };

  @on('/set-user') setUser = (state, user) => ({ ...state, user });
}

export default new HeaderComponent().start('header');
