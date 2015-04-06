var Widget = require(__dirname+"/../../lib/Widget.js");
var helloWorld = Object.create(Widget);

helloWorld.id = "hello-world";
helloWorld.name = "Hello world";
helloWorld.description = "Ce widget ne sert a rien, il permet seulement d afficher un texte avec le titre hello world.";
helloWorld.html = "<h2 class=\"app-title\">Hello World</h2><div class=\"content\"><i class=\"wi wi-alien\"></i> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quam est, suscipit nec egestas non, condimentum ac nisi. Mauris eleifend sollicitudin aliquam. Integer mattis lectus et nunc iaculis ultricies. Pellentesque malesuada, ex et convallis lacinia, turpis mi feugiat arcu, id aliquam lectus lectus id ante. Nunc sed dignissim ligula, at fermentum turpis. Quisque congue risus quis turpis eleifend condimentum. Duis consectetur ultrices luctus. Nunc metus massa, accumsan a blandit in, posuere sed nunc. Curabitur sit amet eleifend ipsum, quis malesuada tellus. Sed vehicula elit id ex pretium vehicula. Nulla non fringilla risus, non sollicitudin lectus. Sed ac ante at erat ultrices tincidunt. Nunc mattis erat ligula, eu finibus ligula tincidunt ac. Pellentesque id convallis neque, in rhoncus metus.</div>";
helloWorld.css = ".wid-hello-world{box-shadow: none !important;}";
helloWorld.optimalSize = 2;

helloWorld.load = function(callback) {
	var result = helloWorld.__proto__.load.call(helloWorld,callback);
}

helloWorld.onLoad = function(){
	console.log("Hello world !");
}

module.exports = helloWorld;