var fs = require('fs');
var http = require('http');

var widgetInfos = {
	id: "meteo",
	name: "Météo",
	description: "Ce widget affiche les prévisions météo sur 3 jours environ. Ces information son issu du site OpenWeatherMap.",
	optimalSize: 2,
	city: "le%20havre",
	showNight: false
}

var load = function(callback){
	var result = {
		infos: widgetInfos,
		html: fs.readFileSync(__dirname+"/default.html","UTF-8"),
		css: fs.readFileSync(__dirname+"/style.css","UTF-8"),
		onLoad: "function(thisApp){"+fs.readFileSync(__dirname+"/onLoad.js","UTF-8")+"}",
		onUpdate: "function(data){"+fs.readFileSync(__dirname+"/onUpdate.js","UTF-8")+"}"
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

			if(response.cod == 200)
			{			
				result.data = {
					cityName: response.city.name,
					cityCountry: response.city.country,
					forecast: []
				};

				for(var i = 0; i<response.list.length; i++)
				{
					var date = new Date(response.list[i].dt*1000);
					var now = new Date();

					if(date.getHours() < 8 || date.getHours() > 20 || (date.getHours() < now.getHours() && date.getDate() == now.getDate()) )
					{
						continue;
					}

					var oneForecast = {
						weatherClass : getWeatherClass(response.list[i].weather[0].id),
						day : getDay(date),
						date : response.list[i].dt*1000,
						temp : Math.round((response.list[i].main.temp-273.15)*100)/100,
						windCompass : Math.round(response.list[i].wind.deg/15)*15,
						windSpeed : Math.round(response.list[i].wind.speed*3.6)
					}
					result.data.forecast.push(oneForecast);
				}
				callback(result);
				reportUpdate(1200000,callback);
			}
			else
			{
				console.warn("Erreur de mise a jour du widget météo, code "+response.cod+". Nouvelle tentative dans 1s");
				reportUpdate(1000,callback);
			}


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
	var classes = {
		0: "cloud-refresh",

		200: "day-storm-showers",
		201: "thunderstorm",
		202: "thunderstorm",
		210: "lightning",
		211: "lightning",
		212: "lightning",
		221: "lightning",
		230: "storm-showers",
		231: "storm-showers",
		232: "thunderstorm",

		300: "cloudy",
		301: "cloudy",
		302: "cloudy",
		302: "day-showers",
		302: "showers",
		302: "showers",
		313: "day-rain-mix",
		314: "rain-mix",
		321: "rain-mix",

		500: "rain",
		501: "rain",
		502: "rain-wind",
		503: "rain-wind",
		504: "rain-wind",
		511: "rain-mix",
		520: "showers",
		521: "showers",
		522: "rain",
		531: "rain",

		600: "day-snow",
		601: "snow",
		602: "snow",
		611: "sleet",
		612: "sleet",
		615: "rain-mix",
		616: "rain-mix",
		620: "snow",
		621: "snow-wind",
		622: "snow-wind",

		701: "fog",
		711: "smoke",
		721: "day-fog",
		731: "dust",
		741: "fog",
		751: "dust",
		761: "dust",
		762: "dust",
		771: "dust",
		781: "tornado",

		800: "day-sunny",
		801: "day-sunny",
		802: "day-cloudy",
		803: "cloudy",
		804: "cloudy",

		900: "tornado",
		901: "storm-showers",
		902: "hurricane",
		903: "snowflake-cold",
		904: "hot",
		905: "cloudy-windy",
		906: "hail",

		951: "day-sunny",
		952: "day-sunny",
		953: "day-sunny",
		954: "day-sunny",
		955: "day-sunny",
		956: "cloudy-windy",
		957: "cloudy-windy",
		958: "hail",
		959: "hail",
		960: "storm-showers",
		961: "storm-showers",
		962: "hurricane",
	}

	if(classes[code] == null)
	{
		code = 0;
	}

	return classes[code];
}

function reportUpdate(time, callback)
{
	setTimeout(function(){
		update(callback);
	},time);
}

exports.load = load;
exports.update = update;
exports.infos = widgetInfos;