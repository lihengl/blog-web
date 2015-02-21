var Blog = window.React.createFactory(require("./build/Blog"));

window.React.render(Blog({
    title: "Blog Web Application"
}), document.getElementById("blog"));
