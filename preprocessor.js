"use strict";
var tools = require("react-tools");

var Preprocessor = {
    process: function (src) {
        return tools.transform(src);
    }
};

module.exports = Preprocessor;
