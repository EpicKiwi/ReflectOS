var http = require('http');
var schedule = require('node-schedule');

var BackApp = require('../../lib/BackApp'); //extends
var bingBackground = Object.create(BackApp);

bingBackground.id = "bing-background";
bingBackground.name = "Bing background";
bingBackground.description = "Cette BackApp permet de mettre à jour l arriere plan pour afficher l image du jour Bing";
bingBackground.apiUrl = "http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=fr-FR"

bingBackground.onLoad = function(){
	socket.emit("updateBackApp",'bing-background');
};

bingBackground.onUpdate = function(data){
	$("#display").css("background-image","url('"+data.imageUrl+"')");
};

bingBackground.update = function(callback){
	var result = bingBackground.__proto__.update.call(bingBackground);
	http.get(bingBackground.apiUrl,function(res){
		var response = "";
		res.on("data",function(chunk){
			response += chunk;
		});
		res.on("end",function(){
			response = JSON.parse(response);
			result.data.imageUrl = "http://www.bing.com"+response.images[0].url;
			result.data.imageDescription = response.images[0].copyright;
			callback(result);

			var updateDate = new Date();
			updateDate.setHours(0);
			updateDate.setMinutes(0);
			updateDate.setSeconds(0);
			updateDate.setDate(updateDate.getDate()+1);
			schedule.scheduleJob(updateDate,function(){
				bingBackground.update(callback);
			});
			console.log("Ecran mis a jour ... prochaine mise a jour le "+updateDate.getDate()+"/"+(updateDate.getMonth()+1)+" a minuit");
		});
	})
	.on("error",function(){
		console.error("Erreur lors de l'acces a l'API");
		console.log("Reessais dans 30s");
		setTimeout(function(){
			bingBackground.update(callback);
		},30000);
	});
};

module.exports = bingBackground;