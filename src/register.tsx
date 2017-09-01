import app, {Component} from 'apprun';

export default class registerComponent extends Component {
  state = 'register';

  view = (state) => {
    return <div>
      <h1>{state}</h1>
    </div>
  }

  update = {
    '#register': state => state,
  }
}


// to use this component in main.tsx
// import register from './register';
// const element = document.getElementById('my-app');
// new register().start(element);
