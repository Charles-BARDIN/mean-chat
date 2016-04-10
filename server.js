var express = require('express');
var PORT = process.env.PORT || 1000;
var app = express();
var path = require('path');
var server = require('http').Server(app);
var mongoose = require('mongoose');
var Entities = require('html-entities').AllHtmlEntities;

var entities = new Entities();

var parser = require('./server/bbcode/bbcode');
var Message = require('./server/db/db').Message

var CACHE_LIMIT = 100;
var MESSAGE_SIZE_LIMIT = 500;
var USERNAME_SIZE_LIMIT = 50;

// Init current message id;
var message_id = 0;

// Cache
var messTable = [];

// TODO : implement functionality
var clientConnected = 0;

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

loadFromDatabase();
initSocket();


// Functions
function loadFromDatabase(){
    Message.find(function(err, results) {
        if(err)
            console.log(err);
        else{
            if(results.length){
                message_id = Number(results[0].message_id) + 1;

                for(var i = 0; i < results.length; i++){
                    messTable.push(convertMessToCache(results[i]));
                }
            }
        }

        launchServer();
    })
    .sort({$natural: -1})
    .limit(CACHE_LIMIT);
};

function initSocket(){   
    var io = require('socket.io')(server);

    io.sockets.on('connection', function (socket) {
        clientConnect(socket);

        setNewMessEvent(socket);

        socket.on('disconnect', function() {
            console.log('Client disconnected: ' + socket.id);
        })
    });
};

function launchServer(){
    server.listen(PORT, function(){
        console.log("Server running on " + PORT);
    });
};

function clientConnect(socket){
    console.log('Client connected: ' + socket.id);
    socket.emit('connexionResponse', {
        valid: true
    })
    socket.emit('messageRecovery', {
        messTable: messTable
    });
};

function setNewMessEvent(socket){
    socket.on('message', function (message) {
        checkMessage(message, socket);
    });
};

function checkMessage(message, socket){
    if(message.content.length > MESSAGE_SIZE_LIMIT){
        socket.emit('messageResponse', {
                fault: "Message size too long: " + 
                        message.length + 
                        ", limit: " + MESSAGE_SIZE_LIMIT
            });
    }else if(message.username.length > USERNAME_SIZE_LIMIT){
        socket.emit('messageResponse', {
                fault: "Username size too long: " + 
                        message.length + 
                        ", limit: " + USERNAME_SIZE_LIMIT
            });
    }else{
        // Capitalize username
        message.username =  message.username.substring(0,1).toUpperCase() + 
                            message.username.substring(1);

        message.content = addHtmlContent(message.content);

        // content is encoded, except for the created html, we encode it again
        
        message.username = entities.encode(message.username);
        message.content = entities.encode(message.content);

        // Set id
        message.message_id = message_id;
        message_id ++;

        addInDB(message, socket);
    }            
};

function addInDB(message, socket){
    var dbMess = new Message(message);
    dbMess.save(function(err){
        if(err) {
            console.log(err);
            socket.emit('messageResponse', {
                fault: "An error occured on saving"
            });
        } else {
            var cacheMess = convertMessToCache(dbMess);
            addMessageToCache(cacheMess);
            broadCastNewMess(socket, cacheMess);
        }
    });
};

function convertMessToCache(dbMess){
    return {
        username: entities.decode(dbMess.username),
        content: entities.decode(dbMess.content),
        message_id: dbMess.message_id,
        time: dbMess.time
    };
}

function addMessageToCache(message){
    messTable.unshift(message);
    if(messTable.length > CACHE_LIMIT){
        messTable.pop();
    }
};

function broadCastNewMess(socket, message){
    socket.broadcast.emit('newMessage', {
        message: message
    });

    socket.emit('messageResponse', {
        message: message
    });
};

function addHtmlContent(text){
    var rslt = parser.parseString(text);

    return rslt;
};

/**
 * Created by Charles on 02/04/2016.
 */