import app from 'apprun';

export default function ({ max, current, onpage }) {
  const pages = new Array(max).fill(0);
  return <nav>
    <ul className="pagination" onclick={e => onpage(e)}>
      {pages.map((page, idx) => <li className={`page-item ${page === current ? 'active' : ''}`}>
        <a className="page-link">{idx + 1}</a>
      </li>)}
    </ul>
  </nav>
}