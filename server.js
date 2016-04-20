var express = require('express');
var config = require('./server/constants');
var PORT = config.PORT;
var app = express();
var path = require('path');
var server = require('http').Server(app);
var mongoose = require('mongoose');
var writelog = require('./server/writelog').writelog;
var TYPE = 'SERVER'

// Used for production build
app.use(express.static(path.join(__dirname, 'public')));

app.all('/*', function(req, res){
    res.send('' +
        '<!DOCTYPE html>' +
        '<html>' +
            '<head>' +
                '<meta charset="utf-8" />' +
                '<meta name="viewport" content="width=device-width, user-scalable=no">' +
                '<title ng-bind="pageTitle">Chat</title>' +
                '<base href="/" />' +
            '</head>' +
            '<body>' +
                '<div ui-view class="container"></div>' +
                '<script src="/socket.io/socket.io.js"></script>' +
                '<script src="bundle.js"></script>' +
            '</body>' +
        '</html>')
});

// Fill cache message with db data
require('./server/caches/message')
.loadFromDB(function(){
    server.listen(PORT, function(){
        writelog("Server initialized with success on port " + PORT, TYPE);
        console.log("Listening on " + PORT + "...");
    });
});

// Init socket
require('./server/socket/socket').initSocket(server);


/**
 * Created by Charles on 02/04/2016.
 */