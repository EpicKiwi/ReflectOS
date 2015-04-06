var Widget = require(__dirname+"/../../lib/Widget.js");
var bienvenue = Object.create(Widget);

bienvenue.id = "bienvenue";
bienvenue.name = "Bienvenue";
bienvenue.description = "Ce widget donne les principales informations à propos de ReflectOs et comment débuter.";
bienvenue.html = "<div class=\"content\"><h2>Bienvenue</h2><p>Bienvenue sur votre installation ReflectOS. Vous pouvez des maintenant configurer cet ecran sur la panel d'administration en accedant à l'ip de l'ordinateur depuis un autre appareil.</div>";
bienvenue.css = ".wid-bienvenue h2{font-size:50px;margin-top:50px;text-align:center;}";
bienvenue.optimalSize = 2;

bienvenue.load = function(callback) {
	var result = bienvenue.__proto__.load.call(bienvenue,callback);
}

module.exports = bienvenue;