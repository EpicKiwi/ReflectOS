var http = require('http');
var schedule = require('node-schedule');

var BackApp = require('../../lib/BackApp'); //extends
var webbackground = Object.create(BackApp);

webbackground.id = "web-background";
webbackground.name = "Web background";
webbackground.description = "Cette BackApp permet de mettre un arriere plan personnalisé provenant d une URL spécifiée";

webbackground.parameters = {
								url: {type:"text",label:"URL de votre image",content:"http://lorempixel.com/1920/1000/"},
							};

webbackground.onLoad = function(){
	socket.emit("updateBackApp","web-background");
};

webbackground.onUpdate = function(data){
	$("#display").css("background-image","url('"+data+"')");
};

webbackground.update = function(callback){
	var result = webbackground.__proto__.update.call(webbackground);
	result.data = webbackground.parameters.url.content;
	callback(result);
};

module.exports = webbackground;