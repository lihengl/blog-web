'use strict';
var Application = window.React.createFactory(require('./components/application.jsx'));

var initialData = document.getElementById('state').innerHTML;
var rootElement = document.getElementById('application');

window.React.render(Application(JSON.parse(initialData)), rootElement);
