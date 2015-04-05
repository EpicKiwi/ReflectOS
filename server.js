var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var Profil = require('./lib/Profil');
var appsManager = require("./lib/appsManager");

var profils = [];
var newProfil = Object.create(Profil);
newProfil.id = "default";
newProfil.name = "Default";
newProfil.default = true;
newProfil.widgets = [
						[
						{width: 2,widget: "meteo"},
						{width: 1,widget: null},
						{width: 2,widget: "horloge"},
						{width: 1,widget: null},
						{width: 2,widget: "news"}
						],
						[
						{width: 4,widget: null},
						{width: 4,widget: null}
						],
					];
newProfil.backApps = ["bing-background"];
profils.push(newProfil);
var newProfil = Object.create(Profil);
newProfil.id = "clock";
newProfil.name = "Clock";
newProfil.default = false;
newProfil.widgets = [
						[
						{width: 3,widget: null},
						{width: 2,widget: "horloge"},
						{width: 3,widget: null}
						],
						[
						{width: 4,widget: null},
						{width: 4,widget: null}
						],
					];
profils.push(newProfil);

app.use("/static",express.static(__dirname+"/static"));

app.get("/",function(request,response){
	if(request.connection.remoteAddress == "127.0.0.1" || request.connection.remoteAddress == "::ffff:127.0.0.1")
	{
		for(var i = 0; i<profils.length; i++)
		{
			if(profils[i].default)
			{
				var profil = profils[i];
				break;
			}
		}

		response.render("display.html.twig",{profil: profil});
	}
	else
	{
		response.render("admin.html.twig",{profils:profils,defaultProfil:Profil,widgetsAvaliable: appsManager.getWidgetsAvaliable()});
	}
});

app.get("/admin",function(request,response){
		response.render("admin.html.twig",{profils:profils,defaultProfil:Profil,widgetsAvaliable: appsManager.getWidgetsAvaliable()});
});

app.get("/display",function(request,response){
		for(var i = 0; i<profils.length; i++)
		{
			if(profils[i].default)
			{
				var profil = profils[i];
				break;
			}
		}

		response.render("display.html.twig",{profil: profil});
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