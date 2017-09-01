import app, {Component} from 'apprun';

export default class homeComponent extends Component {
  state = 'home';

  view = (state) => {
    return <div>
      <h1>{state}</h1>
    </div>
  }

  update = {
    '#': state => state,
  }
}


