# ![RealWorld Example App](logo.png)

> ### [AppRun](https://github.com/yysun/apprun) codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


### [Demo](https://gothinkster.github.io/apprun-realworld-example-app)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate application frontend built with **[AppRun](https://github.com/yysun/apprun)** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the [RealWorld](https://github.com/gothinkster/realworld) community style guides & best practices.

This codebase has about 1100 lines of source code that can be gziped to 18K.

## General functionality

* Authenticate users via JWT (login/signup pages + logout button)
* CRU* users (sign up & settings page - no deleting required)
* CRUD Articles
* CR*D Comments on articles (no updating required)
* GET and display paginated lists of articles
* Favorite articles
* Follow other users
* Modal confirmation for deleting articles and comments

## How it works


This RealWorld example application is built using [AppRun](https://github.com/yysun/apprun) components that implements the model-view-update architecture.
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

Or use the _on_ decorator
```
import app, { Component, on } from 'apprun';
class ArticleComponent extends Component{

  state = {}

  view = (state) => <div></div>

  @on('#/article') root =  async(state, slug) => {}

}
```

## About AppRun
[AppRun](https://github.com/yysun/apprun) is a 3K library for developing applications using the elm style model-view-update architecture and event pub and sub pattern.

Applications built with AppRun have less line of code, smaller js file and better performance. See a comparision from [A Real-World Comparison of Front-End Frameworks with Benchmarks](https://medium.freecodecamp.org/a-real-world-comparison-of-front-end-frameworks-with-benchmarks-e1cb62fd526c).


AppRun has also joined the [js-framework-benchmark](https://github.com/krausest/js-framework-benchmark) project. You can see its [performance results](https://rawgit.com/krausest/js-framework-benchmark/master/webdriver-ts-results/table.html) compared to other frameworks and libraries.

Following articles have more details of this application and AppRun.
* [Deep Dive into AppRun State](https://medium.com/@yiyisun/deep-dive-into-apprun-state-3d6fb58b1521)

* [Deep Dive into AppRun Events](
https://medium.com/@yiyisun/deep-dive-into-apprun-events-1650dc7811ea)

* [Building Applications with AppRun](https://yysun.github.io/apprun/#/)



## Getting started

* Visit the [live demo](https://gothinkster.github.io/apprun-realworld-example-app)
* clone this repo
* npm install
* npm start
* open http://localhost:8080 in browser

Pull requests are welcome.

## License

MIT

Copyright (c) 2017 Yiyi Sun
