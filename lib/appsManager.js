var fs = require('fs');

module.exports.getWidgetsAvaliable = function(){
	var widDirectory = fs.readdirSync(__dirname+"/../widgets");
	var widgets = [];
	for(var i = 0; i<widDirectory.length; i++)
	{
		var widget = require(__dirname+"/../widgets/"+widDirectory[i]+"/widget.js");
		widgets.push(widget.infos);
	}
	return widgets;
}

module.exports.getBackAppsAvaliable = function(){
	var bckDirectory = fs.readdirSync(__dirname+"/../backApps");
	var backApps = [];
	for(var i = 0; i<bckDirectory.length; i++)
	{
		var backApp = require(__dirname+"/../backApps/"+bckDirectory[i]+"/"+bckDirectory[i]+".js");
		backApps.push(backApp.getInfos());
	}
	return backApps;
}

module.exports.getBackApp = function(appId,callback){
	fs.readdir(__dirname+"/../backApps/"+appId,function(err,files){
		if(err == null)
		{
			callback(require(__dirname+"/../backApps/"+appId+"/"+appId+".js"));	
		}
		else
		{
			console.warn("erreur de chargement de la BackApp "+err.code);
		}
	});
};