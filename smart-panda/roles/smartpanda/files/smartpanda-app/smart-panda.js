// Defining variables
var config = require('./config.json');
var redisPort = config.redisPort;
var redisHost = config.redisAddress;
var hostPort = config.hostPort;
var hostAddress = config.hostAddress;
var redis = require('redis');
var express = require('express');
var app = express();
var HttpDispatcher = require('httpdispatcher');
var http = require('http');
var dispatcher = new HttpDispatcher();

// Checking that you can connect to redis
console.log('connecting to redis...');
var client = redis.createClient(redisPort, redisHost, {
    retry_strategy: function (options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
        console.log('the redis server refused the connection');
   }
}
})

// Handeling a POST request to the server
app.post('/', function(req, res) {
   console.log("Detected a POST request for the application"); //writing to console
   client.incr('counter', function(err, reply) {
   if (err) {
        console.log(reply);
   }
})
})

// Posting the amount of POST requests sent to the server
app.get('/counter', function(req, res) {
    client.get('counter', function(err, reply) {
	if (err) {
	     res.end('error with redis');
        }
        else {
             res.end(reply);	  
        }
  })
})

// Creating the server that listents on port 8080
var server = app.listen(hostPort, function () {
     console.log("Panda app listening at http://%s:%s", hostAddress, hostPort)
})

