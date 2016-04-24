/* eslint-env browser */
require('babel-polyfill');
var React = require('react');
var ReactDOM = require('react-dom');

var ArticlePage = require('./components/ArticlePage.jsx').default;
var ProfilePage = require('./components/ProfilePage.jsx').default;


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
