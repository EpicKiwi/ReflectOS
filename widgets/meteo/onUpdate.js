console.log(data);
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