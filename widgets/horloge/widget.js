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
		minutes: minutes,
		date: formatDate(date)
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


function formatDate(date)
{
	var weekday = new Array(7);
	weekday[0]=  "Dimanche";
	weekday[1] = "Lundi";
	weekday[2] = "Mardi";
	weekday[3] = "Mercredi";
	weekday[4] = "Jeudi";
	weekday[5] = "Vendredi";
	weekday[6] = "Samedi";

	var month = new Array();
	month[0] = "Janvier";
	month[1] = "Février";
	month[2] = "Mars";
	month[3] = "Avril";
	month[4] = "Mai";
	month[5] = "Juin";
	month[6] = "Juillet";
	month[7] = "Aout";
	month[8] = "Septembre";
	month[9] = "Octobre";
	month[10] = "Novembre";
	month[11] = "Décembre";

	var format = weekday[date.getDay()]+" "+date.getDate()+" "+month[date.getMonth()]+" "+date.getFullYear();

	return format;
}

exports.update = update;
exports.load = load;