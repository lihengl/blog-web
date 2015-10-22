/* eslint-env browser */
require('babel/polyfill');
var React = require('react/addons');

var Application = React.createFactory(require('./components/Application.jsx'));

var initialData = document.getElementById('state').innerHTML;
var rootElement = document.getElementById('application');

React.render(Application(JSON.parse(initialData)), rootElement);
