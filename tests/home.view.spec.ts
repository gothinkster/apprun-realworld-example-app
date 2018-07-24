import home from '../src/components/home';

describe('home component', () => {
  it('view test', () => {
    const state = {
      type: 'feed',
      articles: [],
      tags: ['1', '2', '3'],
      max: 10,
      page: 1
    }
    const vdom = home['view'](state);
    expect(JSON.stringify(vdom, undefined, 2)).toMatchSnapshot();
  })
});
