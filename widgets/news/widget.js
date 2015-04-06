var fs = require('fs');
var http = require('http');

var Widget = require(__dirname+"/../../lib/Widget.js");
var news = Object.create(Widget);

news.id = "news";
news.name = "News";
news.description = "Ce widget permet d afficher les derniers articles publiés sur le web. Ces informations sont issues du site FeedZilla.";
news.html = fs.readFileSync(__dirname+"/default.html","UTF-8");
news.css = fs.readFileSync(__dirname+"/style.css","UTF-8");
news.optimalSize = 2;
news.feedAddress = "http://api.feedzilla.com/v1/categories/419/articles.json?order=date";

news.load = function(callback) {
	var result = news.__proto__.load.call(news,callback);
}

news.onLoad = function(){
	console.log("Widget news chargé");
	socket.emit("updateWidget","news");
};

news.onUpdate = function(data){
	function resetSlideTitle(){
		$(".wid-news .news-row:not(.reduce) .news-title").animate({"margin-left": 0},1000,function(){
			setTimeout(slideTitle,2000);
		});
	}

	function slideTitle(){
		var goal = -1*($(".wid-news .news-row:not(.reduce) .news-title").width()-$(".wid-news .news-row:not(.reduce)").width());
		$(".wid-news .news-row:not(.reduce) .news-title").animate({"margin-left": goal+"px"},10000,"linear",function(){
			setTimeout(resetSlideTitle,2000);
		});
	}

	console.log(data);
	$(".wid-news .content").html("");
	$(".wid-news .app-title").html(data.newsTitle);
	var lastDay = null;
	for (var i = 0; i < 10; i++) {
		var date = new Date(data.articles[i].publish_date);

		var html = "<div class='news-row";

		if(i != 0)
		{
			html += " reduce";
		}
		else
		{
			html += " first";
		}
		
		html += "'>";

		html +=			"<span class='news-title'>"+data.articles[i].title;+"</span>"+
					"</div>";
		$(".wid-news .content").append(html);
	};

	if($(".wid-news .news-row:not(.reduce)").width() < $(".wid-news .news-row:not(.reduce) .news-title").width())
	{
	slideTitle();
	}
};

news.update = function(callback){
	var result = news.__proto__.update.call(news);

	console.log("Envoie de la requete a "+news.feedAddress);
	http.get(news.feedAddress,function(response)
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

			setTimeout(function(){news.update(callback)},600000);
			callback(result);
		});
	});

};

module.exports = news;