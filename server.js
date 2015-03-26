var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get("/",function(request,response){
	response.render("display.html.twig");
});

io.on('connection',function(socket){
	console.log("Connexion socket : "+socket.request.socket.remoteAddress);

	socket.on("disconnect",function(){
		console.log("Déconnexion socket : "+socket.request.socket.remoteAddress)
	});
});

http.listen(80,function(){
	console.log("Ecoute de connexion ...");
});