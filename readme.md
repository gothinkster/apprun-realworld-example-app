# ![RealWorld Example App](logo.png)

> ### [AppRun](https://github.com/yysun/apprun) codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


### [Demo](https://yysun.github.com/realworld-starter-kit)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate application frontend built with **[AppRun](https://github.com/yysun/apprun)** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the [RealWorld](https://github.com/gothinkster/realworld) community style guides & best practices.

## How it works

[AppRun](https://github.com/yysun/apprun) is a 3K library for developing applications using the elm style model-view-update architecture and event pub and sub pattern.

The application is built using [AppRun](https://github.com/yysun/apprun) component, which has the model-view-update architecture.
```
import app, { Component } from 'apprun';
class ArticleComponent extends Component{
  
  state = {}

  view = <div></div>

  update = {
    '#/article': async(state, slug) => {}
  }

}
```

The application code has about 1000 lines source that can be gziped to 14.5K.

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
