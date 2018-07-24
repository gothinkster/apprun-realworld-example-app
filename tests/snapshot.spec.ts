import home from '../src/components/home';
import signin from '../src/components/signin';
import register from '../src/components/register';
import editor from '../src/components/editor';
import settings from '../src/components/settings';
import profile from '../src/components/profile';
import article from '../src/components/article';

describe('home component view', () => {
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

describe('signin component', () => {
  it('view snapshot: #1', () => {
    const component = signin;
    const state = {
      "messages": [],
      "returnTo": "#/login"
    };
    const vdom = component['view'](state);
    expect(JSON.stringify(vdom, undefined, 2)).toMatchSnapshot();
  })
});

describe('register component', () => {
  it('view snapshot: #1', () => {
    const component = register;
    const state = {};
    const vdom = component['view'](state);
    expect(JSON.stringify(vdom, undefined, 2)).toMatchSnapshot();
  })
});

describe('editor component - new article', () => {
  it('view snapshot: #1', () => {
    const component = editor;
    const state = {
      "article": {
        "title": "",
        "description": "",
        "body": "",
        "tagList": []
      }
    };
    const vdom = component['view'](state);
    expect(JSON.stringify(vdom, undefined, 2)).toMatchSnapshot();
  })
});

describe('settings component', () => {
  it('view snapshot: #1', () => {
    const component = settings;
    const state = {
      "user": {
        "id": 11159,
        "email": "1@1test.com",
        "createdAt": "2017-09-03T21:33:35.494Z",
        "updatedAt": "2017-09-15T20:43:17.712Z",
        "username": "user 1",
        "bio": "test user 1",
        "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTExNTksInVzZXJuYW1lIjoidXNlciAxIiwiZXhwIjoxNTM3NTg0ODY3fQ.oKbqH7fNkLQE7IuwsIlBHXcPJ9rP7VTeBBiIAXgS0Gw"
      }
    };
    const vdom = component['view'](state);
    expect(JSON.stringify(vdom, undefined, 2)).toMatchSnapshot();
  })
});

describe('profile component', () => {
  it('view snapshot: #1', () => {
    const component = profile;
    const state = {
      "name": "user 1",
      "type": "articles",
      "articles": [
        {
          "title": "Hello world",
          "slug": "hello-world-6n0suv",
          "body": "Hello world",
          "createdAt": "2018-07-21T13:55:08.520Z",
          "updatedAt": "2018-07-21T13:55:08.520Z",
          "tagList": [],
          "description": "Hello world",
          "author": {
            "username": "user 1",
            "bio": "test user 1",
            "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
            "following": false
          },
          "favorited": false,
          "favoritesCount": 0
        },
        {
          "title": "OK",
          "slug": "ok-fakc89",
          "body": "1,2",
          "createdAt": "2018-01-03T16:54:12.060Z",
          "updatedAt": "2018-01-03T16:54:12.060Z",
          "tagList": [
            "2",
            "1"
          ],
          "description": "OK",
          "author": {
            "username": "user 1",
            "bio": "test user 1",
            "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
            "following": false
          },
          "favorited": false,
          "favoritesCount": 1
        },
        {
          "title": "new post - edit",
          "slug": "new-post-qmr2hl",
          "body": "new - edit asasasasasa dsdsds",
          "createdAt": "2017-09-11T03:10:42.711Z",
          "updatedAt": "2017-09-11T03:24:07.751Z",
          "tagList": [],
          "description": "",
          "author": {
            "username": "user 1",
            "bio": "test user 1",
            "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
            "following": false
          },
          "favorited": true,
          "favoritesCount": 3
        },
        {
          "title": "An article - edited",
          "slug": "an-article-edited-n993c6",
          "body": "We've gone to great lengths to adhere to the [RealWorld](https://github.com/gothinkster/realworld) community style guides & best practices.",
          "createdAt": "2017-09-08T01:27:01.178Z",
          "updatedAt": "2017-09-08T01:27:01.178Z",
          "tagList": [],
          "description": "",
          "author": {
            "username": "user 1",
            "bio": "test user 1",
            "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
            "following": false
          },
          "favorited": true,
          "favoritesCount": 2
        },
        {
          "title": "An article",
          "slug": "an-article-kchbx7",
          "body": "We've gone to great lengths to adhere to the [RealWorld](https://github.com/gothinkster/realworld) community style guides & best practices.",
          "createdAt": "2017-09-08T01:14:49.190Z",
          "updatedAt": "2017-09-08T01:14:49.190Z",
          "tagList": [],
          "description": "",
          "author": {
            "username": "user 1",
            "bio": "test user 1",
            "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
            "following": false
          },
          "favorited": false,
          "favoritesCount": 0
        },
        {
          "title": "t2",
          "slug": "t2-b5bp4w",
          "body": "t2",
          "createdAt": "2017-09-05T03:14:26.450Z",
          "updatedAt": "2017-09-05T03:14:26.450Z",
          "tagList": [
            "3",
            "2",
            "1"
          ],
          "description": "",
          "author": {
            "username": "user 1",
            "bio": "test user 1",
            "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
            "following": false
          },
          "favorited": true,
          "favoritesCount": 3
        },
        {
          "title": "Test New Post",
          "slug": "t1-vd5veq",
          "body": "[AppRun](https://github.com/yysun/apprun) is a 3K library for developing applications using the elm style model-view-update architecture and event pub and sub pattern.\n\nThe RealWorld example application is built using [AppRun](https://github.com/yysun/apprun) component that implements the model-view-update architecture.",
          "createdAt": "2017-09-05T03:03:14.420Z",
          "updatedAt": "2017-09-12T00:06:14.036Z",
          "tagList": [
            "test",
            "AppRun",
            "typescript"
          ],
          "description": "",
          "author": {
            "username": "user 1",
            "bio": "test user 1",
            "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
            "following": false
          },
          "favorited": false,
          "favoritesCount": 1
        }
      ],
      "page": 1,
      "profile": {
        "username": "user 1",
        "bio": "test user 1",
        "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
        "following": false
      },
      "max": 7
    };
    const vdom = component['view'](state);
    expect(JSON.stringify(vdom, undefined, 2)).toMatchSnapshot();
  })
});


describe('article component', () => {
  it('view snapshot: #1', () => {
    const component = article;
    const state = {
      "article": {
        "title": "Hello world",
        "slug": "hello-world-6n0suv",
        "body": "Hello world",
        "createdAt": "2018-07-21T13:55:08.520Z",
        "updatedAt": "2018-07-21T13:55:08.520Z",
        "tagList": [],
        "description": "Hello world",
        "author": {
          "username": "user 1",
          "bio": "test user 1",
          "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
          "following": false
        },
        "favorited": false,
        "favoritesCount": 0
      },
      "comments": []
    };

    const vdom = component['view'](state);
    expect(JSON.stringify(vdom, undefined, 2)).toMatchSnapshot();
  })
});