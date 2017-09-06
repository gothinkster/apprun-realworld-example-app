import app from 'apprun';
import { IComment } from '../models';

function Comment({ comment }: { comment: IComment }) {
  return <div className="card">
    <div className="card-block">
      <p className="card-text">
        { comment.body }
      </p>
    </div>
    <div className="card-footer">
      <a className="comment-author">
      <img src="comment.author.image" className="comment-author-img" />
    </a>
    &nbsp;
    <a className="comment-author" href="['/profile', comment.author.username]">
      { comment.author.username }
    </a>
    <span className="date-posted">
      { comment.createdAt }
    </span>
    <span className="mod-options"> {/*hidden = !canModify*/}
      <i className="ion-trash-a" onclick = "deleteClicked()" ></i>
    </span>
  </div>
</div>
}

export default function ({ comments }: { comments: Array<IComment> }) {
  return <div className="row">
    <div className="col-xs-12 col-md-8 offset-md-2">
      <form className="card comment-form">
        <div className="card-block">
          <textarea className="form-control" placeholder="Write a comment..." rows="3"></textarea>
        </div>
        <div className="card-footer">
          <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
          <button className="btn btn-sm btn-primary">
            Post Comment
                </button>
        </div>
      </form>
      {comments.map(comment => <Comment comment={comment} />)}
    </div>
  </div>
}
