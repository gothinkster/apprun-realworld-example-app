import app, { Component } from 'apprun';

export default class createComponent extends Component {
  state = {
    user: null
  };

  view = (state) => {
    if (document.location.hash !== '#create' || !state.user) return;
    return <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control form-control-lg" placeholder="Article Title" />
                </fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control" placeholder="What's this article about?" />
                </fieldset>
                <fieldset className="form-group">
                  <textarea className="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control" placeholder="Enter tags" />
                  <div className="tag-list"></div>
                </fieldset>
                <button className="btn btn-lg pull-xs-right btn-primary" type="button">
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  }

  update = {
    '#create': state => {
      if (!state.user) app.run('#signin');
      return state
    },
    '#user': (state, user) => ({ ...state, user })
  }
}

