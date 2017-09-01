import app, {Component} from 'apprun';

export default class settingsComponent extends Component {
  state = 'settings';

  view = (state) => {
    return <div>
      <h1>{state}</h1>
    </div>
  }

  update = {
    '#settings': state => state,
  }
}


// to use this component in main.tsx
// import settings from './settings';
// const element = document.getElementById('my-app');
// new settings().start(element);
