var fs = require('fs');
var http = require('http');

var widgetInfos = {
	id: "news",
	name: "News",
	description: "Ce widget permet d afficher les derniers articles publiés sur le web. Ces informations sont issues du site FeedZilla.",
	optimalSize: 2,
	feedAddress: "http://api.feedzilla.com/v1/categories/419/articles.json?order=date"
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
	console.log("Mise a jour du widget news")
	var result = {infos: widgetInfos, data:{}};


	console.log("Envoie de la requete a "+widgetInfos.feedAddress);
	http.get(widgetInfos.feedAddress,function(response)
	{
		console.log("connexion établie");
		var data = "";

		response.on("data",function(chunk){
			data += chunk;
		});

		response.on("end",function(){
			console.log("Données reçus");
			data = JSON.parse(data);
			result.data.newsTitle = data.description;
			result.data.articles = [];
			for(var i = data.articles.length-1; i>0; i--)
			{
				result.data.articles.push(data.articles[i]);
			};

			reportUpdate(600000,callback);
			callback(result);
		});
	});
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