var Blog = window.React.createFactory(require("./react_components/blog"));
var prop = window.document.getElementById("prop").innerHTML;
var root = window.document.getElementById("root");

window.React.render(Blog(JSON.parse(prop)), root);
