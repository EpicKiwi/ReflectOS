var fs = require('fs');

var widgetInfos = {
	id: "meteo",
	name: "Météo",
	optimalSize: 2
}

exports.load = function(){
	var result = {
		infos: widgetInfos,
		html: fs.readFileSync(__dirname+"/default.html","UTF-8"),
		css: fs.readFileSync(__dirname+"/style.css","UTF-8")
	}

	return result;
}