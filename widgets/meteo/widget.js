var fs = require('fs');
var http = require('http');

var widgetInfos = {
	id: "meteo",
	name: "Météo",
	optimalSize: 2,
	city: "Havre",
	showNight: false
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
	console.log("Mise à jour du widget Météo");
	var result = {
		infos : widgetInfos
	};

	var requestOptions = {
	  hostname: 'api.openweathermap.org',
	  port: 80,
	  path: '/data/2.5/forecast?q='+widgetInfos.city
	};
	http.get(requestOptions,function(res){
		var response = "";

		res.on("data",function(chunk){
			response += chunk;
		});

		res.on("end",function(chunk){
			response = JSON.parse(response);

			result.data = {
				cityName: response.city.name,
				cityCountry: response.city.country,
				forecast: []
			};

			for(var i = 0; i<response.list.length; i++)
			{
				var date = new Date(response.list[i].dt*1000);

				if(date.getHours() < 8 || date.getHours() > 17 )
				{
					continue;
				}

				var oneForecast = {
					weatherClass : getWeatherClass(response.list[i].weather[0].id),
					day : getDay(date),
					date : response.list[i].dt*1000,
					temp : Math.round((response.list[i].main.temp-273.15)*100)/100
				}
				result.data.forecast.push(oneForecast);
			}

			reportUpdate(3600000,callback);
			callback(result);

		});
	});
}

function getDay(date)
{
	var now = new Date();
	var diff = (date-now)/86400000;

	var weekday = new Array(7);
	weekday[0]=  "Dimanche";
	weekday[1] = "Lundi";
	weekday[2] = "Mardi";
	weekday[3] = "Mercredi";
	weekday[4] = "Jeudi";
	weekday[5] = "Vendredi";
	weekday[6] = "Samedi";

	if(date.getDay() == now.getDay() && diff < 1)
	{
		return "Aujourd'hui";
	}

	if(date.getDay() == (now.getDay()+1) && diff < 2)
	{
		return "Demain";
	}

	return weekday[date.getDay()];
}

function getWeatherClass(code)
{
	return "day-sunny";
}

function reportUpdate(time, callback)
{
	setTimeout(function(){
		update(callback);
	},time);
}

exports.load = load;
exports.update = update;