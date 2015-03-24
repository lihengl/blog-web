# Blog, Web

[![devDependency Status](https://david-dm.org/lihengl/blog-web/dev-status.svg)](https://david-dm.org/lihengl/blog-web#info=devDependencies)
[![Dependency Status](https://david-dm.org/lihengl/blog-web.svg)](https://david-dm.org/lihengl/blog-web)
[![Coverage Status](https://coveralls.io/repos/lihengl/blog-web/badge.svg?branch=release)](https://coveralls.io/r/lihengl/blog-web?branch=release)
[![Build Status](https://travis-ci.org/lihengl/blog-web.svg?branch=release)](https://travis-ci.org/lihengl/blog-web)

Given the current capability of open-source software, this might be the time where, that elegant and intuitive blogging platform which used to only be living in the author's own imagination, to finally become a reality.

## Getting Started

The project uses [Jest](https://facebook.github.io/jest/) for unit-testing, [Webpack](http://webpack.github.io/) for bundling the client, and configures [Gulp](http://gulpjs.com/) to streamline development workflow. A simple `npm install` followed by `npm start` should get the server up and running. The start command would also initiate file watcher who keeps the browser in-sync with latest changes. Prior to every commit, mandatory lints and tests would be triggered in that order. It is to ensure repository health being kept at a certain level.

## Coding Convention

Despite the sizable directory structure, development changes should only be made into `actions`, `components`, `routes` and `stores`. Directories with underscored names, namely `node_modules`, `react_components`, and `static_assets`, will be populated by system processes and should always be kept out from version control.
