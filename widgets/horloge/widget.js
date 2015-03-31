var fs = require('fs');
var http = require('http');

var widgetInfos = {
	id: "horloge",
	name: "Horloge",
	optimalSize: 2,
}

exports.load = function load(callback){
	var result = {
		infos: widgetInfos,
		html: fs.readFileSync(__dirname+"/default.html","UTF-8"),
		css: fs.readFileSync(__dirname+"/style.css","UTF-8"),
		onLoad: "function(thisApp){"+fs.readFileSync(__dirname+"/onload.js","UTF-8")+"}",
		onUpdate: "function(data){"+fs.readFileSync(__dirname+"/onupdate.js","UTF-8")+"}"
	}
	callback(result);
}

exports.update = function update(callback){
	console.log("Mise à jour du widget Horloge");
}

function reportUpdate(time, callback)
{
	setTimeout(function(){
		update(callback);
	},time);
}