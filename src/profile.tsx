import app, { Component } from 'apprun';
import Articles from './article-list';
import Pages from './page-list';

class profileComponent extends Component {
  state = 'profile';

  view = (state) => {
    return <div className="profile-page">

      <div className="user-info">
        <div className="container">
          <div className="row">

            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src="http://i.imgur.com/Qr71crq.jpg" className="user-img" />
              <h4>Eric Simons</h4>
              <p>
                Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks like Peeta from the Hunger Games
              </p>
              <button className="btn btn-sm btn-outline-secondary action-btn">
                <i className="ion-plus-round"></i>
                &nbsp;
            Follow Eric Simons
          </button>
            </div>

          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">

          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link active" href="">My Articles</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="">Favorited Articles</a>
                </li>
              </ul>
            </div>
            <Articles articles={state.articles} />
            <Pages max={state.articles.length} current={1} />
          </div>
        </div>
      </div>
    </div>
  }

  update = {
    '#/profile': state => state,
  }
}

new profileComponent().mount('my-app')