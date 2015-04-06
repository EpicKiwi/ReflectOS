var widgetInfos = {
	id: "paques",
	name: "Pâques",
	description: "Pour l occation de paques, affichez un bel oeuf sur votre ecran ReflectOS",
	optimalSize: 2,
}

exports.load = function(callback){
	var result = {
		infos: widgetInfos, 
		html: "<h2 class=\"app-title\">Joyeuses Pâques</h2><div class=\"content\"><img src='/static/oeuf.png' alt='oeuf'/></div>", 
		css: ".wid-paques .content{padding-top: 25% !important;text-align: center;}",
		onLoad: "function(){}"
	}
	
	callback(result);
}

exports.infos = widgetInfos;