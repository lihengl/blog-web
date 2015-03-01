"use strict";
var Application = window.React.createFactory(require("./react_components/application"));
var initialData = window.document.getElementById("prop").innerHTML;
var rootElement = window.document.getElementById("application");

window.React.render(Application(JSON.parse(initialData)), rootElement);
