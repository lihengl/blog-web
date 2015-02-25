Blog Web Application
===

[![devDependency Status](https://david-dm.org/lihengl/blog-web/dev-status.svg)](https://david-dm.org/lihengl/blog-web#info=devDependencies)
[![Dependency Status](https://david-dm.org/lihengl/blog-web.svg)](https://david-dm.org/lihengl/blog-web)
[![Coverage Status](https://coveralls.io/repos/lihengl/blog-web/badge.svg?branch=release)](https://coveralls.io/r/lihengl/blog-web?branch=release)
[![Build Status](https://travis-ci.org/lihengl/blog-web.svg?branch=release)](https://travis-ci.org/lihengl/blog-web)

This is an Isomerphic&trade; Javascript project using [React](http://facebook.github.io/react/) and [Express](http://expressjs.com/). It is designed to use [JSX](http://facebook.github.io/react/docs/jsx-in-depth.html) all the way from `<html></html>` which means no Handlebars, Jade, or Dust. This way the mindset for writing templates could be kept consistent and pure. It also emphasizes the concept of *component* and makes them as composable as possible. Goal for the project is to become an elegant and intuitive blogging platform which used to only be living in the author's own imagination.

Getting Started
---

The project uses [Webpack](http://webpack.github.io/) for client-server component sharing, and configures [Gulp](http://gulpjs.com/) to automate  development builds. To begin, clone this repository, navigate to its root directory, then do `npm install && bower install` followed by `npm start`. Go to `http://localhost:3000/` in a web browser to see the default greeting page. Access/Error logs will be printed back to the terminal console. Make sure to keep the process running. Assets/Server will update automatically whenever changes are made to the source files.
