var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get("/",function(request,response){
	response.send("Hello world !");
});

io.on('connection',function(socket){
	console.log("Connexion socket : "+socket.handshake.address.address);
});

http.listen(80,function(){
	console.log("Ecoute de connexion ...");
});