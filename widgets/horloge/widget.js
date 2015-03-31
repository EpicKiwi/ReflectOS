var fs = require('fs');
var http = require('http');

var widgetInfos = {
	id: "horloge",
	name: "Horloge",
	optimalSize: 2,
}

var load = function(callback){
	var result = {
		infos: widgetInfos,
		html: fs.readFileSync(__dirname+"/default.html","UTF-8"),
		css: fs.readFileSync(__dirname+"/style.css","UTF-8"),
		onLoad: "function(thisApp){"+fs.readFileSync(__dirname+"/onload.js","UTF-8")+"}",
		onUpdate: "function(data){"+fs.readFileSync(__dirname+"/onupdate.js","UTF-8")+"}"
	}
	callback(result);
}

var update = function(callback){
	var result = {
		infos : widgetInfos
	};

	var date = new Date();

	var hours = "";
	if(date.getHours() < 10)
	{
		hours += "0"+date.getHours();
	}
	else
	{
		hours += date.getHours();
	}

	var minutes = "";
	if(date.getMinutes() < 10)
	{
		minutes += "0"+date.getMinutes();
	}
	else
	{
		minutes += date.getMinutes();
	}

	result.data = {
		hours: hours,
		minutes: minutes
	}
	reportUpdate(10000,callback);
	callback(result);
}

function reportUpdate(time, callback)
{
	setTimeout(function(){
		update(callback);
	},time);
}

exports.update = update;
exports.load = load;