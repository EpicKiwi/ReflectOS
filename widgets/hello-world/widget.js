var widgetInfos = {
	id: "hello-world",
	name: "Hello world",
	optimalSize: 2
}

exports.load = function(callback){
	var result = {
		infos: widgetInfos, 
		html: "<h2 class=\"app-title\">Hello World</h2><div class=\"content\"><i class=\"wi wi-alien\"></i> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quam est, suscipit nec egestas non, condimentum ac nisi. Mauris eleifend sollicitudin aliquam. Integer mattis lectus et nunc iaculis ultricies. Pellentesque malesuada, ex et convallis lacinia, turpis mi feugiat arcu, id aliquam lectus lectus id ante. Nunc sed dignissim ligula, at fermentum turpis. Quisque congue risus quis turpis eleifend condimentum. Duis consectetur ultrices luctus. Nunc metus massa, accumsan a blandit in, posuere sed nunc. Curabitur sit amet eleifend ipsum, quis malesuada tellus. Sed vehicula elit id ex pretium vehicula. Nulla non fringilla risus, non sollicitudin lectus. Sed ac ante at erat ultrices tincidunt. Nunc mattis erat ligula, eu finibus ligula tincidunt ac. Pellentesque id convallis neque, in rhoncus metus.</div>", 
		css: ".wid-hello-world{box-shadow: none !important;}",
		onLoad: "function(){console.log(\"Hello World !\")}"
	}
	
	callback(result);
}

exports.infos = widgetInfos;