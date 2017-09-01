import app, {Component} from 'apprun';

export default class signinComponent extends Component {
  state = 'signin';

  view = (state) => {
    return <div>
      <h1>{state}</h1>
    </div>
  }

  update = {
    '#signin': state => state,
  }
}


// to use this component in main.tsx
// import signin from './signin';
// const element = document.getElementById('my-app');
// new signin().start(element);
