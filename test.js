var request = require("supertest");
var server  = require("./server");

request(server).get("/").expect(200).end(function (err) {
    "use strict";
    if (err) { throw err; }
});
