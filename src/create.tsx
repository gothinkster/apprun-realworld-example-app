import app, { Component } from 'apprun';
import { serializeObject, INewArticle, articles } from './api'

class createComponent extends Component {
  state = {
    user: null,
    messages: []
  };

  view = (state) => {
    if (document.location.hash !== '#/create' || !state.user) return;
    return <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">

            {state.messages && <ul className="error-messages">
              {state.messages.map(message =>
                <li>{message}</li>
              )}
            </ul>}

            <form onsubmit={e => this.run('create-article', e)}>
              <fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control form-control-lg" placeholder="Article Title" name="title" />
                </fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control" placeholder="What's this article about?" name="description"/>
                </fieldset>
                <fieldset className="form-group">
                  <textarea className="form-control" rows="8" placeholder="Write your article (in markdown)" name="body"></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control" placeholder="Enter tags" name="tags"/>
                  <div className="tag-list"></div>
                </fieldset>
                <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
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
    '#/create': state => {
      if (!state.user) app.run('#/login');
      return state
    },
    '#user': (state, user) => ({ ...state, user }),
    'create-article': async (state, e) => {
      try {
        e.preventDefault();
        const article = serializeObject<any>(e.target);
        article.tagList = article.tags.split(',');
        const result = await articles.create(article);
        document.location.hash = `#/article/${result.article.slug}`;
        return state;
      } catch (errors) {
        return {...state, messages: errors}
      }
    }
  }
}

new createComponent().mount('my-app')
