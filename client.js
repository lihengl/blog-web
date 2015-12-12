/* eslint-env browser */
'use strict';
require('babel/polyfill');
var React = require('react');
var ReactDOM = require('react-dom');

var ArticlePage = require('./components/ArticlePage.jsx');
var ProfilePage = require('./components/ProfilePage.jsx');


var initialData = document.getElementById('initial-state').innerHTML;
var rootElement = document.getElementById('application');
var pageComponent = null;

switch (rootElement.className.toUpperCase()) {
  case 'ARTICLE':
    pageComponent = ArticlePage;
    break;
  case 'PROFILE':
    pageComponent = ProfilePage;
    break;
  default:
    pageComponent = ProfilePage;
}

pageComponent = React.createFactory(pageComponent);

ReactDOM.render(pageComponent(JSON.parse(initialData)), rootElement);
