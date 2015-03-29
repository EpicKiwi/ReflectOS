var fs = require('fs');

var widgetInfos = {
	id: "meteo",
	name: "Météo",
	optimalSize: 2
}

exports.load = function(callback){
	var result = {
		infos: widgetInfos,
		html: fs.readFileSync(__dirname+"/default.html","UTF-8"),
		css: fs.readFileSync(__dirname+"/style.css","UTF-8"),
		onLoad: "function(){"+fs.readFileSync(__dirname+"/onload.js","UTF-8")+"}",
		onUpdate: "function(){"+fs.readFileSync(__dirname+"/onupdate.js","UTF-8")+"}"
	}

	callback(result);
}

exports.update = function(callback){
	var result = {
		infos : widgetInfos,
		data : ""
	}

	callback(result);
}