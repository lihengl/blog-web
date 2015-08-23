'use strict';
require('babel/polyfill');
/* globals React */
var Application = React.createFactory(require('./components/Application.jsx'));

var initialData = document.getElementById('state').innerHTML;
var rootElement = document.getElementById('application');

var appInstance = React.render(Application(JSON.parse(initialData)), rootElement);

if (module.hot) {
    require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
        getRootInstances: function () { return [appInstance]; }
    });
}