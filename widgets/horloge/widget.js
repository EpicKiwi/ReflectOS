var fs = require('fs');
var http = require('http');

var Widget = require(__dirname+"/../../lib/Widget.js");
var horloge = Object.create(Widget);

horloge.id = "horloge";
horloge.name = "Horloge";
horloge.description = "Ce widget permet d afficher l heure et la date actuelle.";
horloge.html = fs.readFileSync(__dirname+"/default.html","UTF-8");
horloge.css = fs.readFileSync(__dirname+"/style.css","UTF-8");
horloge.optimalSize = 2;

horloge.load = function(callback) {
	var result = horloge.__proto__.load.call(horloge,callback);
}

horloge.onLoad = function(){
	console.log("Widget horloge chargé");
	socket.emit("updateWidget","horloge");
};

horloge.onUpdate = function(data){
	$(".wid-horloge .clock .hours").html(""+data.hours);
	$(".wid-horloge .clock .minutes").html(""+data.minutes);
	$(".wid-horloge .date").html(data.date);
};

horloge.update = function(callback){
	var result = horloge.__proto__.update.call(horloge);

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
	setTimeout(function(){horloge.update(callback)},10000);
	callback(result);
};

module.exports = horloge;

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