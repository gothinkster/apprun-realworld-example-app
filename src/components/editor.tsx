import app, { Component, on } from 'apprun';
import { serializeObject, articles } from '../api'
import Errors from './error-list';

class EditorComponent extends Component {
  state = {}

  view = (state) => {
    if (!app['user'] || !state.article) return;
    const article = state.article;
    return <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {state.errors && <Errors errors={state.errors} />}
            <form onsubmit={e => this.run('submit-article', e)}>
              <input type="hidden" name="slug" value={article.slug} />
              <fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control form-control-lg" placeholder="Article Title"
                    name="title" value={article.title} />
                </fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control" placeholder="What's this article about?"
                    name="description" value={article.description} />
                </fieldset>
                <fieldset className="form-group">
                  <textarea className="form-control" rows="8" placeholder="Write your article (in markdown)" name="body">
                    {article.body}
                  </textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control" placeholder="Enter tags" name="tags"
                    value={article.tagList.join(', ')} />
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

  
  @on('#/editor') root = async (state, slug) => {
    if (!app['user']) app.run('#/login');
    let article;
    if (slug) {
      const result = await articles.get(slug);
      article = result.article
    }
    article = article || { title: '', description: '', body: '', tagList: [] };
    return { article };
  }

  @on('submit-article') submitArticle = async (state, e) => {
    try {
      e.preventDefault();
      const article = serializeObject<any>(e.target);
      article.tagList = article.tags.split(',');
      const result = article.slug
        ? await articles.update(article)
        : await articles.create(article)
      app.run(`#update-article`, result.article, 'editor')
      document.location.hash = `#/article/${result.article.slug}`;
    } catch ({ errors }) {
      return { ...state, errors }
    }
  }
}

export default new EditorComponent().mount('my-app')
