var fs = require('fs');
var http = require('http');

var Widget = require(__dirname+"/../../lib/Widget.js");
var meteo = Object.create(Widget);

meteo.id = "meteo";
meteo.name = "Météo";
meteo.description = "Ce widget affiche les prévisions météo sur 3 jours environ. Ces information son issu du site OpenWeatherMap.";
meteo.html = fs.readFileSync(__dirname+"/default.html","UTF-8");
meteo.css = fs.readFileSync(__dirname+"/style.css","UTF-8");
meteo.optimalSize = 2;
meteo.parameters = {
	city: {type:"text",lable:"Ville de prévisions",content:"le%20havre"},
};

meteo.load = function(callback) {
	var result = meteo.__proto__.load.call(meteo,callback);
}

meteo.onLoad = function(){
	console.log("Widget meteo chargé");
	socket.emit("updateWidget","meteo");
};

meteo.onUpdate = function(data){
	$(".wid-meteo .content").html("");
	$(".wid-meteo .app-title").html(data.cityName);
	var lastDay = null;
	for (var i = 0; i < 10; i++) {
		var date = new Date(data.forecast[i].date);
		var html = "";
		html += "<div class='meteo-row";

		if(i != 0)
		{
			html += " reduce";
		}
		else
		{
			html += " first";
		}

		if(lastDay != date.getDay())
		{
			lastDay = date.getDay();
			$(".wid-meteo .content .meteo-row:last-child").addClass('last');
		}
		
		html += "'>";

		html +=  	"<div class='meteo-icon'><i class=\"wi wi-"+data.forecast[i].weatherClass+"\"></i></div>"+
						"<div class='meteo-info'>"+
							"<span class='meteo-field'>"+data.forecast[i].day+"</span>"+
							"<span class='meteo-field meteo-hour'>"+date.getHours()+" H </span>"+
							"<span class='meteo-field'><i class=\"wi wi-thermometer\"></i> "+data.forecast[i].temp+"°C</span>"+
							"<span class='meteo-field compass'><i class=\"wi wi-wind-default _"+data.forecast[i].windCompass+"-deg\"></i>"+data.forecast[i].windSpeed+" Km/h</span>"+
						"</div>"+
					"</div>";
		$(".wid-meteo .content").append(html);
	};
};

meteo.update = function(callback){
	var result = meteo.__proto__.update.call(meteo);

	var requestOptions = {
	  hostname: 'api.openweathermap.org',
	  port: 80,
	  path: '/data/2.5/forecast?q='+meteo.parameters.city.content
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
				setTimeout(function(){meteo.update(callback)},1200000);
			}
			else
			{
				console.log("La requete a api.openweathermap.org/data/2.5/forecast?q="+meteo.parameters.city.content)
				console.warn("Erreur de mise a jour du widget météo, code "+response.cod+". Nouvelle tentative dans 10s");
				setTimeout(function(){meteo.update(callback)},10000);
			}


		});
	});

};

module.exports = meteo;

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