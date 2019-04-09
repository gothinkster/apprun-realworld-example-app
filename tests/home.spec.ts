import app from 'apprun';
import home from '../src/components/home';
import { auth, tags, articles } from '../src/api';
import './mocks';

describe('home component', () => {

  it('should update state: #/', (done) => {
    app.run('route', '#/');
    setTimeout(() => {
      const state = home.state;
      expect(state.type).toBe('');
      expect(state.page).toBe(1);
      expect(state.max).toBe(101);
      expect(tags.all).toHaveBeenCalledWith();
      expect(articles.search).toHaveBeenCalledWith({ offset: 0, limit: 10 });
      done();
    })
  })

  it('should update state: #//2', (done) => {
    app.run('route', '#//2');
    setTimeout(() => {
      const state = home.state;
      expect(state.type).toBe('');
      expect(state.page).toBe(2);
      expect(state.max).toBe(101);
      expect(tags.all).toHaveBeenCalledWith();
      expect(articles.search).toHaveBeenCalledWith({ offset: 10, limit: 10 });
      done();
    })
  })

  it('should not call #/feed w/o user', () => {
    app.on('#/login', auth.signIn);
    app.run('route', '#/feed');
    expect(auth.authorized()).toBeFalsy();
    expect(auth.signIn).toHaveBeenCalled();
    expect(articles.feed).not.toHaveBeenCalled();
  })

  it('should update state: #/feed/3', (done) => {
    app['user'] = {};
    app.run('route', '#/feed/3');
    setTimeout(() => {
      const state = home.state;
      expect(state.type).toBe('feed');
      expect(state.page).toBe(1);
      expect(state.max).toBe(5);
      expect(tags.all).toHaveBeenCalledWith();
      expect(articles.feed).toHaveBeenCalledWith({ offset: 20, limit: 10 });
      done();
    })
  })

  it('should update state: #/tag', (done) => {
    app.run('route', '#/tag');
    setTimeout(() => {
      const state = home.state;
      expect(state.type).toBe('tag');
      expect(state.tag).toBeUndefined();
      expect(state.page).toBe(1);
      expect(state.max).toBe(101);
      expect(tags.all).toHaveBeenCalledWith();
      expect(articles.search).toHaveBeenCalledWith({ tag:undefined, offset: 0, limit: 10 });
      done();
    })
  })

  it('should update state: #/tag/t2', (done) => {
    app.run('route', '#/tag/t2');
    setTimeout(() => {
      const state = home.state;
      expect(state.type).toBe('tag');
      expect(state.max).toBe(101);
      expect(state.tag).toBe('t2');
      expect(state.page).toBe(1);
      expect(tags.all).toHaveBeenCalledWith();
      expect(articles.search).toHaveBeenCalledWith({ tag: 't2', offset: 0, limit: 10 });
      done();
    })
  })

  it('should update state: #/tag/t3/20', (done) => {
    app.run('route', '#/tag/t3/20');
    setTimeout(() => {
      const state = home.state;
      expect(state.type).toBe('tag');
      expect(state.tag).toBe('t3');
      expect(state.page).toBe(11);
      expect(tags.all).toHaveBeenCalledWith();
      expect(articles.search).toHaveBeenCalledWith({ tag: 't3', offset: 190, limit: 10 });
      done();
    })
  })

})