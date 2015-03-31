var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.use("/static",express.static(__dirname+"/static"));

app.get("/",function(request,response){
	var requestOptions = {
	  hostname: 'www.bing.com',
	  port: 80,
	  path: '/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=fr-fr'
	};

	http.get(requestOptions,function(res){
		var datas = "";

		res.on("data",function(chunk){
			datas += chunk;
		});

		res.on("end",function(){
			datas = JSON.parse(datas);
			response.render("display.html.twig",{background:"http://www.bing.com"+datas.images[0].url});
		});
	});
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

	socket.on("disconnect",function(){
		console.log(socketIp+" : Déconnexion socket");
	});
});

server.listen(80,function(){
	console.log("Ecoute de connexion ...");
});