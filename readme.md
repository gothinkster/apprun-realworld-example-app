# ![RealWorld Example App](logo.png)

> ### [AppRun](https://github.com/yysun/apprun) codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


### [Demo](https://gothinkster.github.io/apprun-realworld-example-app)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate application frontend built with **[AppRun](https://github.com/yysun/apprun)** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the [RealWorld](https://github.com/gothinkster/realworld) community style guides & best practices.

This codebase has about 1000 lines of source code that can be gziped to 18K.

See a comparison from [A Real-World Comparison of Front-End Frameworks with Benchmarks (2018 Update)](https://medium.freecodecamp.org/a-real-world-comparison-of-front-end-frameworks-with-benchmarks-2018-update-e5760fb4a962).

## General functionality

* Authenticate users via JWT (login/signup pages + logout button)
* CRU* users (sign up & settings page - no deleting required)
* CRUD Articles
* CR*D Comments on articles (no updating required)
* GET and display paginated lists of articles
* Favorite articles
* Follow other users
* **Modal dialog for deleting articles and comments**
* **Static Typed**
* **AppRun CLI in console enabled**
* **Connect to the Redux devtool extensions**

![devtools](https://github.com/yysun/apprun/raw/master/docs/apprun-dev-tools.gif)


## About AppRun
[AppRun](https://github.com/yysun/apprun) is a 3K library for developing applications using the elm inspired architecture and event pub and sub pattern.

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
