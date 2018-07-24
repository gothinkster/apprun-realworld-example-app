import app from 'apprun';
import { auth, tags, articles, comments, profile } from '../src/api';

app.on('#', async (route, ...p) => {
  app.run(`#/${route || ''}`, ...p);
})

auth.current = jest.fn(() => null);
auth.signIn = jest.fn(() => { });
auth.register = jest.fn(() => { });
auth.save = jest.fn(() => { });
// auth.authorized = jest.fn(() => false);

tags.all = jest.fn(() => ({ tags: [1, 2, 3] }));

articles.search = jest.fn(() => ({ articles: [], articlesCount: 10 }));
articles.feed = jest.fn(() => ({ articles: [], articlesCount: 5 }));
articles.get = jest.fn((slug) => ({
  article: {
    slug,
    author: {},
    title: '',
    body: '',
    tagList: []
  },
}));

articles.delete = jest.fn(() => { });
articles.favorite = jest.fn(() => { });
articles.unfavorite = jest.fn(() => { });
articles.update = jest.fn(() => { });
articles.create = jest.fn(() => { });

comments.create = jest.fn(() => { });
comments.delete = jest.fn(() => { });
comments.forArticle = jest.fn(() => ({ comments: [] }));

profile.get = jest.fn(() => { });
profile.follow = jest.fn(() => { });
profile.unfollow = jest.fn(() => { });


