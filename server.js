var http = require("http");
var echarts = require('./index.js');
var wordCloud = require('./word-cloud.js');
var url = require("url");

function processConfig(request, response, callback) {
  var queryData = "";
  if (typeof callback !== "function") {
    return null;
  }
  if (request.method === "GET") {
    var arg = url.parse(request.url, true).query;
    if (!arg.config) {
      response.end('request parameter "config" invalid');
      return;
    }
    request.config = arg.config;
    callback();
  } else {
    request.on("data", function (data) {
      queryData += data;
      if (queryData.length > 1e6) {
        response.end("request body too large");
      }
    });
    request.on("end", function () {
      request.config = queryData;
      callback();
    });
  }
}

var server = http.createServer(function (request, response) {
  processConfig(request, response, function () {
    var config;
    try {
      config = JSON.parse(request.config);
    } catch (e) {
      response.end('request parameter "config" format invalid, is not JSON');
      return;
    }
    if (!config || !config.option) {
      response.end('request parameter "config" format invalid');
      return;
    }
    try {
      if (config.wordCloud){
        wordCloud({
          width:config.width,
          height:config.height,
          option:[
            "Hello", "world", "normally", "you", "want", "more", "words",
            "than", "this","Hello", "world", "normally", "you", "want", "more", "words",
            "than", "this","Hello", "world", "normally", "you", "want", "more", "words",
            "than", "this","Hello", "world", "normally", "you", "want", "more", "words",
            "than", "this"]
        },response)
      }else{
        var buffer = echarts({
          option: JSON.parse(config.option),
          width: config.width || 600,
          height: config.height || 400,
        });
        response.setHeader("Content-Type", "image/png");
        response.write(buffer);
        response.end();
      }
    } catch (e){
      response.end;
    }
  });
});

var hostName = "0.0.0.0";
var port = 8081;
server.listen(port, hostName, function () {
  console.log(`server started at port ${port}`);
});
