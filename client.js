var Root = window.React.createFactory(require("./react_components/root"));
var prop = window.document.getElementById("prop").innerHTML;
var node = window.document.getElementById("root");

window.React.render(Root(JSON.parse(prop)), node);
