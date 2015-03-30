var fs = require('fs');
var http = require('http');

var widgetInfos = {
	id: "meteo",
	name: "Météo",
	optimalSize: 2
}

var options = {
	city: "Havre"
}

exports.load = function(callback){
	var result = {
		infos: widgetInfos,
		html: fs.readFileSync(__dirname+"/default.html","UTF-8"),
		css: fs.readFileSync(__dirname+"/style.css","UTF-8"),
		onLoad: "function(thisApp){"+fs.readFileSync(__dirname+"/onload.js","UTF-8")+"}",
		onUpdate: "function(data){"+fs.readFileSync(__dirname+"/onupdate.js","UTF-8")+"}"
	}

	callback(result);
}

exports.update = function(callback){
	var result = {
		infos : widgetInfos
	};

	var requestOptions = {
	  hostname: 'api.openweathermap.org',
	  port: 80,
	  path: '/data/2.5/forecast?q='+options.city
	};
	http.get(requestOptions,function(res){
		var response = "";
		console.log("Requete au serveur météo : "+res.statusCode);

		res.on("data",function(chunk){
			response += chunk;
		});

		res.on("end",function(){
			console.log("Données recus");
			result.data = JSON.parse(response);
			callback(result);
		});
	});
}