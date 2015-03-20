"use strict";
var tools = require("react-tools");

module.exports = {
    process: function (src) {
        return tools.transform(src);
    }
};
