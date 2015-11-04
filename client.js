/* eslint-env browser */
'use strict';
require('babel/polyfill');
var React = require('react');
var ReactDOM = require('react-dom');

var Application = React.createFactory(require('./components/Application.jsx'));

var initialData = document.getElementById('state').innerHTML;
var rootElement = document.getElementById('application');

ReactDOM.render(Application(JSON.parse(initialData)), rootElement);
