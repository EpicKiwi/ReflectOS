var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

app.use("/static",express.static(__dirname+"/static"));

app.get("/",function(request,response){
	response.render("display.html.twig");
});

io.on('connection',function(socket){
	var socketIp = socket.request.socket.remoteAddress;
	console.log(socketIp+" : Connexion socket");

	socket.on("getWidget",function(widgetId){
		fs.readdir("./widgets/"+widgetId,function(err,files){
			if(err == null)
			{
				console.log(socketIp+" : Chargement du widget "+widgetId);
				var widget = require("./widgets/"+widgetId+"/widget.js");
				widget.load(function(data){
					socket.emit("openhWidget",data);
				});
			}
			else
			{
				console.warn(socketIp+" : erreur de chargement du widget "+err.code);
			}
		});
	});

	socket.on("updateWidget",function(widgetId){
		fs.readdir("./widgets/"+widgetId,function(err,files){
			if(err == null)
			{
				var widget = require("./widgets/"+widgetId+"/widget.js");
				widget.update(function(data){
					socket.emit("refreshWidget",data);
				});
			}
			else
			{
				console.warn(socketIp+" : erreur de chargement du widget "+err.code);
			}
		});
	});

	socket.on("disconnect",function(){
		console.log(socketIp+" : Déconnexion socket");
	});
});

http.listen(80,function(){
	console.log("Ecoute de connexion ...");
});