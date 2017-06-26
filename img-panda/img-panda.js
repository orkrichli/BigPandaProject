// Defining variables
var path = require("path");
var express = require('express');
var fs = require("fs");
var app = express();
var HttpDispatcher = require('httpdispatcher');
var http = require('http');
var dispatcher = new HttpDispatcher();
var config = require('./config.json');
var port = config.port;
var host = config.host;
var folder = config.folderPath;

// Writing each request to console - for testing
function handleRequest(request, response){
    try {
        console.log("Requested URL: " + request.url);
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

// Setting static folder - /resources
app.use(express.static(folder));

// Randomizing an image from /resources on every GET request
dispatcher.onGet('/', function(req, res) {

    //reading all the files from /resources
    fs.readdir(folder, function(err, files) {
    if (err) {
        return console.error(err);
    }
    else{
    var images = [];
    files.forEach(function(f) {
        images.push(f);
        });
    }
    var len = images.length;
    // Randomizing a number from the total number of images in /resources
    var num = Math.floor(Math.random() * len);
    var img_path = path.join('/resources/' + images[num]),
        image = fs.readFileSync(img_path);

    // Posting the image to the browser
    res.end(image);
});
});

// Sending an error to the browser in case of an error
dispatcher.onError(function(req, res) {
    res.end("404 - Page Does not exists");
})

// Creating the server that listens on port 8080
http.createServer(handleRequest).listen(port, function(){
    console.log("Server listening on: http://%s:%s", host, port);
});

