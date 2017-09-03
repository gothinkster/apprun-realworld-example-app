import app, { Component } from 'apprun';

export default class headerComponent extends Component {
  state = {}
  view = state => {
    const user = state.user
    return <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
          <a className="nav-link active" href="#">Home</a>
      </li>
      {user && <li className="nav-item">
        <a className="nav-link" href="#create">
          <i className="ion-compose"></i>&nbsp;New Post
            </a>
      </li>
      }
      {user && <li className="nav-item">
          <a className="nav-link" href="#settings">
            <i className="ion-gear-a"></i>&nbsp;Settings
            </a>
        </li>
      }  
      {!user && <li className="nav-item">
        <a className="nav-link" href="#signin">Sign In</a>
      </li>
      }
      {!user && <li className="nav-item">
        <a className="nav-link" href="#register">Sign up</a>
      </li>
      }
    </ul>
  }

  update = {
    '#user': (state, user) => ({ ...state, user })
  }
}