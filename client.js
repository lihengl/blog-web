var Application = window.React.createFactory(require("./react_components/application"));
var prop = window.document.getElementById("prop").innerHTML;
var root = window.document.getElementById("application");

window.React.render(Application(JSON.parse(prop)), root);
