# ![RealWorld Example App](logo.png)

> ### [AppRun](https://github.com/yysun/apprun) codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


### [Demo](https://yysun.github.com/realworld-starter-kit)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate application frontend built with **[AppRun](https://github.com/yysun/apprun)** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the [RealWorld](https://github.com/gothinkster/realworld) community style guides & best practices.

## General functionality

* Authenticate users via JWT (login/signup pages + logout button)
* CRU* users (sign up & settings page - no deleting required)
* CRUD Articles
* CR*D Comments on articles (no updating required)
* GET and display paginated lists of articles
* Favorite articles
* Follow other users

## How it works

[AppRun](https://github.com/yysun/apprun) is a 3K library for developing applications using the elm style model-view-update architecture and event pub and sub pattern.

The RealWorld example application is built using [AppRun](https://github.com/yysun/apprun) component that implements the model-view-update architecture.
```
import app, { Component } from 'apprun';
class ArticleComponent extends Component{

  state = {}

  view = (state) => <div></div>

  update = {
    '#/article': async(state, slug) => {}
  }

}
```

Or use the _on_ decorator (AppRun 1.7+)
```
import app, { Component, on } from 'apprun';
class ArticleComponent extends Component{

  state = {}

  view = (state) => <div></div>

  @on('#/article') root =  async(state, slug) => {}

}
```

This codebase has about 1000 lines of source code that can be gziped to 18K.

Following articles have more details of this application and AppRun.
* [Deep Dive into AppRun State](https://medium.com/@yiyisun/deep-dive-into-apprun-state-3d6fb58b1521)

* [Deep Dive into AppRun Events](
https://medium.com/@yiyisun/deep-dive-into-apprun-events-1650dc7811ea)

* [Building Applications with AppRun](https://medium.com/@yiyisun/building-applications-with-apprun-d103cd461bae)

## Getting started

* Visit the [live demo](https://yysun.github.com/realworld-starter-kit)
* clone this repo
* npm install
* npm start
* open http://localhost:8080 in browser

Pull requests are welcome.

## License

MIT

Copyright (c) 2017 Yiyi Sun
