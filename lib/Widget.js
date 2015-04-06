var polyfill = require('./polyfills');

var Widget = {
	//Id io the BackApp same name of the folder and of the main file
	id: "default",
	//Name of the BackApp
	name: "Default BackApp",
	//Description of the BackApp
	description : "This app don t have any properties",
	//The HTML of the widget
	html: "",
	//The CSS of the widget
	css: "",
	//The optimal size of the cel contain the widget
	optimalSize: 1,
	//Parameters can be customize in Admin
	parameters : {},
	//Function execute client side when Backapp was Loaded
	onLoad: function(){
		console.log("BackApp loaded");
	},
	//Function execute client side when BackApp was Updated
	onUpdate: function(){
		console.log("BackApp don t have to be updated");
	},
	//function execute server side for load the BackApp
	load: function(callback){
		var result = {};
		polyfill.assign(result,this);
		//Stringify the functions client side
		result.onLoad = this.onLoad.toString();
		result.onUpdate = this.onUpdate.toString();
		//Remove the functions server side
		result.load = undefined;
		result.update = undefined;
		//return the result
		if(typeof callback === 'function')
		{
			callback(result);
		}
		else
		{
			return result;
		}
	},
	//function execute serverside for update the BackApp
	update: function(callback){
		var result = {};
		polyfill.assign(result,this);
		//Remove all functions
		result.onLoad = undefined;
		result.onUpdate = undefined;
		result.load = undefined;
		result.update = undefined;
		result.html = undefined;
		result.css = undefined;
		//Add propery data
		result.data = {};
		//Return the result
		if(typeof callback === 'function')
		{
			callback(result);
		}
		else
		{
			return result;
		}
	},

	getInfos: function()
	{
		var result = {};
		polyfill.assign(result,this);
		//Remove all functions
		result.onLoad = undefined;
		result.onUpdate = undefined;
		result.load = undefined;
		result.update = undefined;
		result.html = undefined;
		result.css = undefined;
		
		return result;
	}
}

module.exports = Widget;