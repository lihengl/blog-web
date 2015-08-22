'use strict';
require('babel/polyfill');

var Application = window.React.createFactory(require('./components/Application.jsx'));

var initialData = document.getElementById('state').innerHTML;
var rootElement = document.getElementById('application');

window.React.render(Application(JSON.parse(initialData)), rootElement);
