var tools = require("react-tools");

module.exports = {
    process: function (src) {
        "use strict";
        return tools.transform(src);
    }
};
