import app, {Component} from 'apprun';

export default class profileComponent extends Component {
  state = 'profile';

  view = (state) => {
    return <div>
      <h1>{state}</h1>
    </div>
  }

  update = {
    '#profile': state => state,
  }
}


// to use this component in main.tsx
// import profile from './profile';
// const element = document.getElementById('my-app');
// new profile().start(element);
