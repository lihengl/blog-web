# Blog, Web

[![devDependency Status](https://david-dm.org/lihengl/blog-web/dev-status.svg)](https://david-dm.org/lihengl/blog-web#info=devDependencies)
[![Dependency Status](https://david-dm.org/lihengl/blog-web.svg)](https://david-dm.org/lihengl/blog-web)
[![Coverage Status](https://coveralls.io/repos/lihengl/blog-web/badge.svg?branch=release)](https://coveralls.io/r/lihengl/blog-web?branch=release)
[![Build Status](https://travis-ci.org/lihengl/blog-web.svg?branch=release)](https://travis-ci.org/lihengl/blog-web)

Given the current state of web technology, this might be the time where that overly idealized blogging platform which used to only be living in the author's own imagination, to finally become a reality.

## Getting Started

This is a [Node.js](http://nodejs.org) project. After cloning the repository and execute a standard `npm install`, run `npm run hot` to start a hot-reload development server, then on a separate terminal session run `npm run develop` to start the actual application server.

## Directory Structure

Development effort is either on [React](http://facebook.github.io/react/) in the `component` folder or on [Express](http://expressjs.com) in the `middlewares` folder. Directories with underscored names, namely `node_modules` and `static_assets`, will be populated by build steps and should always be kept out from version control.

## References

The design philosophy is heavily inspired by studies on following materials:

- [Rendering React Components on the Server](http://www.crmarsh.com/react-ssr/) for deep understanding how React renders
- [Live React: Hot Reloading with Time Travel](https://youtu.be/xsSnOQynTHs) for the *(state, action) -> state* concept
- [React Tipes and Best Practices](http://aeflash.com/2015-02/react-tips-and-best-practices.html) for the idea of having single state object
- [A Better Flux with DOM Events](http://arqex.com/1028/better-flux-dom-events) for fortifying my thought on using custom event 
