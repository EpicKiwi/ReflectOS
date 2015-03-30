console.log(data);
$(".wid-meteo .content table").html("");
for (var i = 0; i < 11; i++) {
	var date = new Date(data.list[i].dt*1000);
	var temp = Math.round((data.list[i].main.temp-273.15)*100)/100;
	$(".wid-meteo .content table").append("<tr><td><i class=\"wi wi-day-sunny\"></i></td><td>"+date.getDate()+"/"+date.getMonth()+"</td><td>"+date.getHours()+" H </td><td><i class=\"wi wi-thermometer\"></i> "+temp+"°C</td></tr>")
};