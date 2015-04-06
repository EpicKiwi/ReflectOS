var Widget = require(__dirname+"/../../lib/Widget.js");
var staticText = Object.create(Widget);

staticText.id = "static-text";
staticText.name = "Texte statique";
staticText.description = "Ce widget affiche le texte entré da les parametres";
staticText.html = "<h2 class=\"app-title\">Titre</h2><div class=\"content\">contenu</div>";
staticText.css = ".wid-hello-world{box-shadow: none !important;}";
staticText.optimalSize = 2;
staticText.parameters = {
	title: {type:"text",label:"Le titre",content: "A configurer"},
	text: {type:"text",label:"Le contenu",content: "Veuillez configurer ce widget dans les parametres de l'administration"},
};

staticText.load = function(callback) {
	var result = staticText.__proto__.load.call(staticText);
	result.html = "<h2 class=\"app-title\">"+staticText.parameters.title.content+"</h2><div class=\"content\">"+staticText.parameters.text.content+"</div>";
	callback(result);
}

module.exports = staticText;