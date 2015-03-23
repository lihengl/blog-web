# Blog, Web

[![devDependency Status](https://david-dm.org/lihengl/blog-web/dev-status.svg)](https://david-dm.org/lihengl/blog-web#info=devDependencies)
[![Dependency Status](https://david-dm.org/lihengl/blog-web.svg)](https://david-dm.org/lihengl/blog-web)
[![Coverage Status](https://coveralls.io/repos/lihengl/blog-web/badge.svg?branch=release)](https://coveralls.io/r/lihengl/blog-web?branch=release)
[![Build Status](https://travis-ci.org/lihengl/blog-web.svg?branch=release)](https://travis-ci.org/lihengl/blog-web)

With the current capability of open-source software, that elegant and intuitive blogging platform which used to only be living in the author's own imagination might finally become a reality.

## Rendering Pipeline

This is a [React](http://facebook.github.io/react/) & [Express](http://expressjs.com/) based project with some philosophy in mind:

- It should render on the server
- It should not make use of any other templating engine

With inspiration from [Rendering React Components on the Server](http://www.crmarsh.com/react-ssr/) and [Two React Tips](https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375), the project setup a *rendering pipeline* that plays nicely with both the convention of React and Express, explained here.

### HTML Document as React Component

`components/root.jsx`:

```javascript
<body style={{margin: 0}}>
    <div id="application" dangerouslySetInnerHTML={{
        __html: React.renderToString(Application(this.props.state))
    }}></div>
    <script type="application/json" id="state" dangerouslySetInnerHTML={{
        __html: JSON.stringify(this.props.state)
        .replace(/<\/script/g, "<\\/script")
        .replace(/<!--/g, "<\\!--")
    }}></script>
    {this.props.libraries.map(function (library, index) {
        return <script type="text/javascript" key={index} src={library}></script>;
    })}
    <script type="text/javascript" src={this.props.bundle}></script>
</body>
```

### Override Express's Render Function

`server.js`

```javascript
var server = express().disable("x-powered-by").enable("strict routing");

server.render = Promise.promisify(function (data, callback) {
    var markup = React.renderToStaticMarkup(Root({
        libraries: libraries,
        bundle: bundle,
        state: data || {}
    }));
    return callback(null, ("<!DOCTYPE html>" + markup));
});
```

### Middleware Like Normal

`routes/*.js`

```javascript
var handler = function (req, res, next) {
    if (!req.app.get("mode")) { return next(new Error("invalid mode")); }
    if (!req.apihost) { return next(new Error("invalid apihost")); }
    return query({
        mocking: (req.app.get("mode") === "local"),
        api: req.apihost + "/v1/articles/1"
    }).then(validate).then(function (result) {
        res.locals.state.title = result.title;
        return req.app.render(res.locals.state);
    }).then(function (html) {
        return res.status(200).type("text/html").send(html);
    }, next);
};

module.exports = handler;
```

### Bundle for Client

`client.js`

```javascript
var Application = window.React.createFactory(require("./react_components/application"));
var initialData = document.getElementById("state").innerHTML;
var rootElement = document.getElementById("application");

window.React.render(Application(JSON.parse(initialData)), rootElement);
```

`gulpfile.js`

```javascript
gulp.task("bundle", ["transform"], function () {
    return gulp.src("client.js")
    .pipe(webpack({
        externals: {
            "bluebird": "Promise",
            "react": "React"
        },
        module: {
            loaders: [{
                loader: "json",
                test: /\.json$/
            }]
        },
        output: {
            filename: (pkg.name + ".min.js")
        }
    }))
    .pipe(uglify())
    .pipe(gulp.dest("static_assets/" + pkg.version));
});
```
