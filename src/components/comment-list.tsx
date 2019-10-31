import app from 'apprun';
import { IComment, IProfile } from '../models';
import * as marked from 'marked';

function Comment({ comment }: { comment: IComment }) {
  return <div class="card">
    <div class="card-block">
      <p class="card-text">
        <p>{`_html:${marked(comment.body, { sanitize: true })}`}</p>
      </p>
    </div>
    <div class="card-footer">
      <a class="comment-author">
        <img src={comment.author.image} class="comment-author-img" />
    </a>
    &nbsp;
    <a class="comment-author" href={`#/profile/${comment.author.username}`}>
      { comment.author.username }
    </a>
    <span class="date-posted">
      { new Date(comment.createdAt).toLocaleString() }
    </span>
    { app['user'] && app['user'].username === comment.author.username
      ? <span class="mod-options">
          <i class="ion-trash-a" onclick={e=>app.run('/delete-comment', comment)} ></i>
        </span>
      : ''}
  </div>
</div>
}

export default function ({ comments }: { comments: Array<IComment> }) {
  const user = app['user'] as IProfile;
  return <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      {!user
        ? <p><a href={`#/login/${document.location.hash}`}>Sign in</a> or&nbsp;
          <a href='#/register'>sign up</a> to add comments on this article.</p>
        : <form class="card comment-form" onsubmit={e=>app.run('/new-comment', e)}>
          <div class="card-block">
            <textarea class="form-control" placeholder="Write a comment..." rows="3" name='comment'></textarea>
          </div>
          <div class="card-footer">
            {user.image
              ? <img src={user.image} class="comment-author-img" />
              : <span>@{user.username}</span>
            }
            <button class="btn btn-sm btn-primary" type='submit'>
              Post Comment
            </button>
          </div>
        </form>
      }
      {comments.map(comment => <Comment comment={comment} />)}
    </div>
  </div>
}
