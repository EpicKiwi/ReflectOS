var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);
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
					socket.emit("openWidget",data);
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

	socket.on("getBackApp",function(appId){
		fs.readdir("./backApps/"+appId,function(err,files){
			if(err == null)
			{
				var backApp = require("./backApps/"+appId+"/"+appId+".js");
				backApp.load(function(data){
					socket.emit("openBackApp",data);
				});
			}
			else
			{
				console.warn(socketIp+" : erreur de chargement de la BackApp "+err.code);
			}
		});
	});

	socket.on("updateBackApp",function(appId){
		fs.readdir("./backApps/"+appId,function(err,files){
			if(err == null)
			{
				var backApp = require("./backApps/"+appId+"/"+appId+".js");
				backApp.update(function(data){
					socket.emit("refreshBackApp",data);
				});
			}
			else
			{
				console.warn(socketIp+" : erreur de chargement de la BackApp "+err.code);
			}
		});
	});

	socket.on("disconnect",function(){
		console.log(socketIp+" : Déconnexion socket");
	});
});

server.listen(80,function(){
	console.log("Ecoute de connexion ...");
});