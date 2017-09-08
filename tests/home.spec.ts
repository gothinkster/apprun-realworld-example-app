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
      expect(state.max).toBe(10);
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
      expect(articles.search).toHaveBeenCalledWith({ offset: 10, limit: 10 });
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
      expect(articles.feed).toHaveBeenCalledWith({ offset: 0, limit: 10 });
      done();
    })
  })


  it('should update state: #/feed/3', (done) => {
    app.run('route', '#/feed/3');
    setTimeout(() => {
      const state = home.state;
      expect(state.type).toBe('feed');
      expect(state.page).toBe(3);
      expect(articles.feed).toHaveBeenCalledWith({ offset: 20, limit: 10 });      
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
      expect(articles.search).toHaveBeenCalledWith({ tag:undefined, offset: 0, limit: 10 });      
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
      expect(state.page).toBe(20);
      expect(articles.search).toHaveBeenCalledWith({ tag: 't3', offset: 190, limit: 10 });            
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