import app from 'apprun';
import { tags, articles } from '../src/api';
import home from '../src/components/home';
import '../src/main'

tags.all = jasmine.createSpy('tags.all').and
  .returnValue({ tags: [1, 2, 3] });

articles.search = jasmine.createSpy('articles.search').and
  .returnValue({ articles: [], articlesCount: 10 });

articles.feed = jasmine.createSpy('articles.feed').and
  .returnValue({ articles: [], articlesCount: 5 });

describe('home component', () => {

  it('should update state: #/', (done) => {
    app.run('route', '#/');
    setTimeout(() => {
      const state = home.state;
      expect(state.type).toBe('');
      expect(state.max).toBe(10)
      done();
    })
  })

  it('should update state: #//2', (done) => {
    app.run('route', '#//2');
    setTimeout(() => {
      const state = home.state;
      expect(state.type).toBe('');
      expect(state.page).toBe(2);
      done();
    })
  })

  it('should update state: #/feed', (done) => {
    app.run('route', '#/feed');
    setTimeout(() => {
      const state = home.state;
      expect(state.type).toBe('feed');
      expect(state.page).toBe(1);
      expect(state.max).toBe(5);
      expect(state.page).toBe(1);
      done();
    })
  })


  it('should update state: #/feed/3', (done) => {
    app.run('route', '#/feed/3');
    setTimeout(() => {
      const state = home.state;
      expect(state.type).toBe('feed');
      expect(state.page).toBe(3);
      done();
    })
  })

  it('should update state: #/tag', (done) => {
    app.run('route', '#/tag');
    setTimeout(() => {
      const state = home.state;
      expect(state.type).toBe('tag');
      expect(state.max).toBe(10);
      expect(state.tag).toBeUndefined();
      done();
    })
  })

  it('should update state: #/tag/t2', (done) => {
    app.run('route', '#/tag/t2');
    setTimeout(() => {
      const state = home.state;
      expect(state.type).toBe('tag');
      expect(state.max).toBe(10);
      expect(state.tag).toBe('t2');
      expect(state.page).toBe(1);
      done();
    })
  })

  it('should update state: #/tag/t2/20', (done) => {
    app.run('route', '#/tag/t2/20');
    setTimeout(() => {
      const state = home.state;
      expect(state.type).toBe('tag');
      expect(state.tag).toBe('t2');
      expect(state.page).toBe(20);
      done();
    })
  })

  it('should update state: set-page', (done) => {
    home.run('set-page', '30');
    setTimeout(() => {
      const state = home.state;
      expect(state.page).toBe(30);
      done();
    })
  })

  it('should update state: set-tag', (done) => {
    home.run('set-tag', {
      target: { textContent: 't5' },
      preventDefault: () => { }
    });
    setTimeout(() => {
      const state = home.state;
      expect(state.type).toBe('tag');
      expect(state.tag).toBe('t5');
      expect(state.page).toBe(1);
      expect(document.location.hash).toBe('#/tag/t5/1');
      done();
    })
  })
  
})