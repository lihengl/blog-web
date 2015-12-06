# Blog, Web [![Build Status](https://travis-ci.org/lihengl/blog-web.svg?branch=release)](https://travis-ci.org/lihengl/blog-web) [![Coverage Status](https://coveralls.io/repos/lihengl/blog-web/badge.svg?branch=release)](https://coveralls.io/r/lihengl/blog-web?branch=release) [![Dependency Status](https://david-dm.org/lihengl/blog-web.svg)](https://david-dm.org/lihengl/blog-web)

Given the current state of web technology, this might be the time where that overly idealized blogging platform to finally become a reality.

## Getting Started

This is a [Node.js](http://nodejs.org) codebase. After cloning the repository and execute a standard `npm install`, run an additional `node_modules/.bin/webdriver-manager update --standalone` command to install [Selenium](http://www.seleniumhq.org) for the use of [Protractor](http://angular.github.io/protractor/#/) testing. To begin development, do `npm run selenium`, `npm run hot-reload`, and `npm run dev-server` in three separate terminal sessions. Then, in yet another terminal session, do `npm run demo` and you should be seeing a Chrome browser fire up and demonstrates the application's features.

## Directory Structure

Development effort is either on [React](http://facebook.github.io/react/) in the `components` folder or on [Express](http://expressjs.com) in the `middlewares` folder. Folders with underscored names, namely `node_modules` and `static_assets`, will be populated by build steps and should always be kept out from version control.

## References

The project's philosophy of architecture is heavily inspired by studies on following materials:

- [Rendering React Components on the Server](http://www.crmarsh.com/react-ssr/) for deep understanding how React renders
- [Live React: Hot Reloading with Time Travel](https://youtu.be/xsSnOQynTHs) for the *(state, action) -> state* concept
- [React Tipes and Best Practices](http://aeflash.com/2015-02/react-tips-and-best-practices.html) for the idea of having single state object
- [A Better Flux with DOM Events](http://arqex.com/1028/better-flux-dom-events) for fortifying my thought on using custom event 
