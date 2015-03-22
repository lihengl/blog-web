# Blog, Web

[![devDependency Status](https://david-dm.org/lihengl/blog-web/dev-status.svg)](https://david-dm.org/lihengl/blog-web#info=devDependencies)
[![Dependency Status](https://david-dm.org/lihengl/blog-web.svg)](https://david-dm.org/lihengl/blog-web)
[![Coverage Status](https://coveralls.io/repos/lihengl/blog-web/badge.svg?branch=release)](https://coveralls.io/r/lihengl/blog-web?branch=release)
[![Build Status](https://travis-ci.org/lihengl/blog-web.svg?branch=release)](https://travis-ci.org/lihengl/blog-web)

Goal for this project is to become an elegant and intuitive blogging platform which used to only be living in the author's own imagination.

## Architecture

This is an Isomerphic&trade; JavaScript project using [React](http://facebook.github.io/react/) and [Express](http://expressjs.com/). It follows the original [Flux](http://facebook.github.io/flux/docs/overview.html) convention, which means an unidirectional data flow is enforced with a set of singleton `dispatcher`, `stores` and `actions` being kept within the browser. All outgoing HTTP requests, whether originated from server-side node process or from the browser, are all implemented with [Superagent](http://visionmedia.github.io/superagent/). It eliminates the separation of `HTML` and `CSS` by putting them all into `JSX`. As such, there will be no `.html`, `.jade`, `.handlebars`, or `.dust` files anywhere throughout the project, and no `.css`, `.less`, or `.sass` files to write upon. All templating and styling is *inlined* into `.jsx` so components are truely self-contained within each file.

## Getting Started

The project uses [Jest](https://facebook.github.io/jest/) for unit-testing, [Webpack](http://webpack.github.io/) for client-server component sharing, and configures [Gulp](http://gulpjs.com/) to automate development builds. To begin, clone this repository, navigate to its root directory, then do `npm install` followed by `npm start`. Go to `http://localhost:3000/` in a web browser to see the default greeting page. Go back to the console to examine access/error logs.
