import app, { Component, on } from 'apprun';
import { auth } from '../api'
class HeaderComponent extends Component {
  state = {}
  view = state => {
    const user = state.user
    return <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <a className="nav-link active" href="#/">Home</a>
      </li>
      {user && <li className="nav-item">
        <a className="nav-link" href="#/editor">
          <i className="ion-compose"></i>&nbsp;New Post
            </a>
      </li>
      }
      {user && <li className="nav-item">
        <a className="nav-link" href="#/settings">
          <i className="ion-gear-a"></i>&nbsp;Settings
            </a>
      </li>
      }
      {user ? '' : <li className="nav-item">
        <a className="nav-link" href="#/login">Sign In</a>
      </li>
      }
      {user ? '' : <li className="nav-item">
        <a className="nav-link" href="#/register">Sign up</a>
      </li>
      }
      {user && <li className="nav-item">
        <a className="nav-link" href={`#/profile/${user.username}`}>{user.username}</a>
      </li>
      }
      {user && <li className="nav-item">
        <a className="nav-link" href="#/logout">Sign Out</a>
      </li>
      }
    </ul>
  }

  @on('/user') setUser = (state, user) => ({ ...state, user })

  rednered = async () => {
    let user = app['user'];
    if (!user) {
      try {
        const current = await auth.current();
        app['user'] = current.user;
      }
      catch (ex) {
        console.log(ex.json());
      }
      app.run('/user', user);
    }
  }
}

export default new HeaderComponent().start('header')