Blog, Web
===

[![devDependency Status](https://david-dm.org/lihengl/blog-web/dev-status.svg)](https://david-dm.org/lihengl/blog-web#info=devDependencies)
[![Dependency Status](https://david-dm.org/lihengl/blog-web.svg)](https://david-dm.org/lihengl/blog-web)
[![Coverage Status](https://coveralls.io/repos/lihengl/blog-web/badge.svg?branch=release)](https://coveralls.io/r/lihengl/blog-web?branch=release)
[![Build Status](https://travis-ci.org/lihengl/blog-web.svg?branch=release)](https://travis-ci.org/lihengl/blog-web)

This is an Isomerphic&trade; JavaScript project using [React](http://facebook.github.io/react/) and [Express](http://expressjs.com/). It eliminates the separation of `HTML` and `CSS` so there will be no `.html`, `.jade`, `.handlebars`, `.dust` files, and no `.css`, `.less`, `.sass` sheets anywhere in the project. All templating and styling is done in `.jsx` so we get self-contained components. Goal for the project is to become an elegant and intuitive blogging platform which used to only be living in the author's own imagination.

Getting Started
---

The project uses [Jest](https://facebook.github.io/jest/) for unit-testing, [Webpack](http://webpack.github.io/) for client-server component sharing and configures [Gulp](http://gulpjs.com/) to automate development builds. To begin, clone this repository, navigate to its root directory, then do `npm install && bower install` followed by `npm start`. Go to `http://localhost:3000/` in a web browser to see the default greeting page. Go back to the console to examine access/error logs.
