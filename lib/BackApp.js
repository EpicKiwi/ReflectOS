var polyfill = require('./polyfills');

var BackApp = {
	//Id io the BackApp same name of the folder and of the main file
	id: "default",
	//Name of the BackApp
	name: "Default BackApp",
	//Description of the BackApp
	description : "This app don t have any properties",
	//Parameters can be customize in Admin
	parameters : {},
	//Function execute client side when Backapp was Loaded
	onLoad: function(){
		console.log(this.name+" backApp loaded");
	},
	//Function execute client side when BackApp was Updated
	onUpdate: function(){
		console.log(this.name+" don t have to be updated");
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
		
		return result;
	}
}

module.exports = BackApp;