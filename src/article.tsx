import app, {Component} from 'apprun';

export default class articleComponent extends Component {
  state = 'article';

  view = (state) => {
    return <div>
      <h1>{state}</h1>
    </div>
  }

  update = {
    '#article': state => state,
  }
}


// to use this component in main.tsx
// import article from './article';
// const element = document.getElementById('my-app');
// new article().start(element);
