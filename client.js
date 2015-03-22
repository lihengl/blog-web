"use strict";
var Application = window.React.createFactory(require("./react_components/application"));
var initialData = document.getElementById("state").innerHTML;
var rootElement = document.getElementById("application");

window.React.render(Application(JSON.parse(initialData)), rootElement);
