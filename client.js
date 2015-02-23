var component = window.React.createFactory(require("./component/Blog"));
var container = window.document.getElementById("blog");
var content   = window.document.getElementById("content").innerHTML;

window.React.render(component(JSON.parse(content)), container);
