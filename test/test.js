var _ = require("underscore");

var arr = [{id:1,a:1},{id:2,a:2}];

var toSocket = _.findWhere(arr,{id:1});

console.log(toSocket);