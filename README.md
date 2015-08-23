# Blog, Web

[![devDependency Status](https://david-dm.org/lihengl/blog-web/dev-status.svg)](https://david-dm.org/lihengl/blog-web#info=devDependencies)
[![Dependency Status](https://david-dm.org/lihengl/blog-web.svg)](https://david-dm.org/lihengl/blog-web)
[![Coverage Status](https://coveralls.io/repos/lihengl/blog-web/badge.svg?branch=release)](https://coveralls.io/r/lihengl/blog-web?branch=release)
[![Build Status](https://travis-ci.org/lihengl/blog-web.svg?branch=release)](https://travis-ci.org/lihengl/blog-web)

Given the current state of web technology, this might be the time where that elegant and intuitive blogging platform which used to only be living in the author's own imagination, to finally become a reality.

## Getting Started

This is a Node.JS project. A standard `npm install` would download all the dependencies. To start the development server, execute `npm run hot` first, then open a separate terminal and execute `npm run develop`. The first command launches the *webpack dev server* for live-reloading whereas the second command launches the actual application server. Go to `http://localhost:3000/<article>/<id>` with a web browser and you should see the blog document page.

## Coding Convention

Despite the sizable directory structure, development changes should only be made into `actions`, `components`, `routers` and `stores`. Directories with underscored names, namely `node_modules` and `static_assets`, will be populated by system processes and should always be kept out from version control.
