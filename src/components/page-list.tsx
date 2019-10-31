import app from 'apprun';

export default function ({ max, selected, link }) {
  const pages = new Array(max).fill(0);
  return <nav>
    <ul class="pagination">
      {pages.map((page, idx) => <li class={`page-item ${(idx + 1) === selected ? 'active' : ''}`}>
        <a href={`${link}/${idx + 1}`} class="page-link">{idx + 1}</a>
        </li>)}
    </ul>
  </nav>
}