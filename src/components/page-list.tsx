import app from 'apprun';

export default function ({ max, selected, onpage }) {
  function select(e) {
    e.preventDefault();
    const page = parseInt(e.target.textContent);
    onpage(page);
  }
  const pages = new Array(max).fill(0);
  return <nav>
    <ul className="pagination" onclick={e => select(e)}>
      {pages.map((page, idx) => <li className={`page-item ${(idx + 1) === selected ? 'active' : ''}`}>
          <a href='#' className="page-link">{idx + 1}</a>
        </li>)}
    </ul>
  </nav>
}