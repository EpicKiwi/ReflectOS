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