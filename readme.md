# ![RealWorld Example App](logo.png)

> ### [AppRun](https://github.com/yysun/apprun) codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


### [Demo](https://gothinkster.github.io/apprun-realworld-example-app)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate application frontend built with **[AppRun](https://github.com/yysun/apprun)** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the [RealWorld](https://github.com/gothinkster/realworld) community style guides & best practices.

This codebase has about 1000 lines of source code that can be gziped to 20K.

See a comparison from [A Real-World Comparison of Front-End Frameworks with Benchmarks (2019 Update)](https://medium.freecodecamp.org/a-realworld-comparison-of-front-end-frameworks-with-benchmarks-2019-update-4be0d3c78075).

## General functionality

* Authenticate users via JWT (login/signup pages + logout button)
* CRU* users (sign up & settings page - no deleting required)
* CRUD Articles
* CR*D Comments on articles (no updating required)
* GET and display paginated lists of articles
* Favorite articles
* Follow other users

## Extra functionality
* **Modal dialog for deleting articles and comments**
* **Static Typed**
* **AppRun CLI in console enabled**
* **Connect to the Redux devtool extensions**

![devtools](https://github.com/yysun/apprun/raw/master/docs/apprun-dev-tools.gif)

## Getting started

* Visit the [live demo](https://gothinkster.github.io/apprun-realworld-example-app)
* clone this repo
* npm install
* npm start
* open http://localhost:8080 in browser

## About AppRun
[AppRun](https://github.com/yysun/apprun) is a 3K library for developing applications using the elm inspired architecture and event pub and sub pattern.

In the AppRun Book published by Apress, the Chapter 10-12 describe this application.
* [Order from Amazon](https://www.amazon.com/Practical-Application-Development-AppRun-High-Performance/dp/1484240685/)

[![Order from Amazon](https://camo.githubusercontent.com/99fad1f024c274a3d752a1583cf125037583811c/68747470733a2f2f696d616765732e737072696e6765722e636f6d2f7367772f626f6f6b732f6d656469756d2f393738313438343234303638372e6a7067)](https://www.amazon.com/Practical-Application-Development-AppRun-High-Performance/dp/1484240685/)



Following articles also have details of this application and AppRun.
* [Deep Dive into AppRun State](https://medium.com/@yiyisun/deep-dive-into-apprun-state-3d6fb58b1521)

* [Deep Dive into AppRun Events](
https://medium.com/@yiyisun/deep-dive-into-apprun-events-1650dc7811ea)

* [Building Applications with AppRun](https://yysun.github.io/apprun/#/)



Pull requests are welcome.

## License

MIT

Copyright (c) 2017 Yiyi Sun
