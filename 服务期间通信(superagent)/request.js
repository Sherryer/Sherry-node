var request = require("superagent");

request('get', 'http://localhost:9999/get').end(function(err,data){
    if(err)console.log("err1");
    if(data)console.log(data.res.text)
});

request('post', 'http://localhost:9999/post').end(function(err,data){
    if(err)console.log("err2");
    if(data)console.log(data.res.text)
});
