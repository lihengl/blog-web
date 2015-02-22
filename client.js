var Blog = window.React.createFactory(require("./build/Blog"));
var content = JSON.parse(window.document.getElementById("content").innerHTML);

window.React.render(Blog(content), window.document.getElementById("blog"));
