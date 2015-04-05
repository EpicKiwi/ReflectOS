var widgetInfos = {
	id: "bienvenue",
	name: "Bienvenue !",
	description: "Ce widget donne les principales informations à propos de ReflectOs et comment débuter.",
	optimalSize: 2,
}

exports.load = function(callback){
	var result = {
		infos: widgetInfos, 
		html: "<div class=\"content\"><h2>Bienvenue</h2><p>Bienvenue sur votre installation ReflectOS. Vous pouvez des maintenant configurer cet ecran sur la panel d'administration en accedant à l'ip de l'ordinateur depuis un autre appareil.</div>", 
		css: ".wid-bienvenue h2{font-size:50px;margin-top:50px;text-align:center;}",
		onLoad: "function(){}"
	}
	
	callback(result);
}

exports.infos = widgetInfos;