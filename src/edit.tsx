import app, {Component} from 'apprun';

export default class editComponent extends Component {
  state = 'edit';

  view = (state) => {
    return <div>
      <h1>{state}</h1>
    </div>
  }

  update = {
    '#edit': state => state,
  }
}


// to use this component in main.tsx
// import edit from './edit';
// const element = document.getElementById('my-app');
// new edit().start(element);
