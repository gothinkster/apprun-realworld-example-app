import app from 'apprun';

export default function ({ title, body, ok, cancel, onOK, onCancel }) {
  return <div class="modal-open">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{title}
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick={e => onCancel(e)}>
              <span aria-hidden="true">×</span>
            </button>
          </h5>
        </div>
        <div class="modal-body">
          <p>{body}</p>
        </div>
        <div class="modal-footer">
          {cancel && <button type="button" class="btn btn-secondary"
            data-dismiss="modal" onclick={e => onCancel(e)}>{cancel}</button>}
          &nbsp;&nbsp;
          <button type="button" class="btn btn-primary" onclick={e => onOK(e)}>{ok}</button>
        </div>
      </div>
    </div>
    <div class="modal-backdrop show" onclick={e => onCancel(e)}></div>
  </div>
}