var component = window.React.createFactory(require("./component/Blog"));
var container = window.document.getElementById("root");
var content   = window.document.getElementById("prop").innerHTML;

window.React.render(component(JSON.parse(content)), container);
