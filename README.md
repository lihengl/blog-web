Blog Web Application
===
[![devDependency Status](https://david-dm.org/lihengl/blog-web/dev-status.svg)](https://david-dm.org/lihengl/blog-web#info=devDependencies)
[![Dependency Status](https://david-dm.org/lihengl/blog-web.svg)](https://david-dm.org/lihengl/blog-web)
[![Coverage Status](https://coveralls.io/repos/lihengl/blog-web/badge.svg?branch=release)](https://coveralls.io/r/lihengl/blog-web?branch=release)
[![Build Status](https://travis-ci.org/lihengl/blog-web.svg?branch=release)](https://travis-ci.org/lihengl/blog-web)

Getting Started
---
This is an isomerphic Javascript project using [React](http://facebook.github.io/react/) and [Express](http://expressjs.com/). It uses [Webpack](http://webpack.github.io/) for client-server code sharing, and utilizes [Gulp](http://gulpjs.com/) to automate a rather complicated build process. To begin development, make sure you have [Node.js](http://nodejs.org/) installed on your machine, then clone this repository, `cd` into its root directory under command line, and type:
```sh
$ npm install
```
This will install all of the project's dependencies into a newly-created `node_modules` folder. This step can sometimes take up to a minute depending on network connection and processing power. When done, start the development server by typing:
```sh
$ npm start
```
The console will tell you that it's bundled the assets, done some linting, and had a server listening on port `3000`. If you now open up a web browser and type `http://localhost:3000/` into the address bar, you'll be greeted with the default page of this blogging application. Go back to the console and some logging messages should be showing up there. Try refreshing the browser to verify that it acually works.
