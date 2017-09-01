import app, {Component} from 'apprun';

export default class createComponent extends Component {
  state = 'create';

  view = (state) => {
    return <div>
      <h1>{state}</h1>
    </div>
  }

  update = {
    '#create': state => state,
  }
}


// to use this component in main.tsx
// import create from './create';
// const element = document.getElementById('my-app');
// new create().start(element);
