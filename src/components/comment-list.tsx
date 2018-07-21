import app from 'apprun';
import { IComment, IProfile } from '../models';
import * as marked from 'marked';

function Comment({ comment }: { comment: IComment }) {
  return <div className="card">
    <div className="card-block">
      <p className="card-text">
        <p>{`_html:${marked(comment.body, { sanitize: true })}`}</p>
      </p>
    </div>
    <div className="card-footer">
      <a className="comment-author">
        <img src={comment.author.image} className="comment-author-img" />
    </a>
    &nbsp;
    <a className="comment-author" href={`#/profile/${comment.author.username}`}>
      { comment.author.username }
    </a>
    <span className="date-posted">
      { new Date(comment.createdAt).toLocaleString() }
    </span>
    { app['user'] && app['user'].username === comment.author.username
      ? <span className="mod-options">
          <i className="ion-trash-a" onclick={e=>app.run('/delete-comment', comment)} ></i>
        </span>
      : ''}
  </div>
</div>
}

export default function ({ comments }: { comments: Array<IComment> }) {
  const user = app['user'] as IProfile;
  return <div className="row">
    <div className="col-xs-12 col-md-8 offset-md-2">
      {!user
        ? <p><a href={`#/login/${document.location.hash}`}>Sign in</a> or&nbsp;
          <a href='#/register'>sign up</a> to add comments on this article.</p>
        : <form className="card comment-form" onsubmit={e=>app.run('/new-comment', e)}>
          <div className="card-block">
            <textarea className="form-control" placeholder="Write a comment..." rows="3" name='comment'></textarea>
          </div>
          <div className="card-footer">
            {user.image
              ? <img src={user.image} className="comment-author-img" />
              : <span>@{user.username}</span>
            }
            <button className="btn btn-sm btn-primary" type='submit'>
              Post Comment
            </button>
          </div>
        </form>
      }
      {comments.map(comment => <Comment comment={comment} />)}
    </div>
  </div>
}
