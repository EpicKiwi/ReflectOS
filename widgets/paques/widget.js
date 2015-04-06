var Widget = require(__dirname+"/../../lib/Widget.js");
var paques = Object.create(Widget);

paques.id = "paques";
paques.name = "Pâques";
paques.description = "Pour l occation de paques, affichez un bel oeuf sur votre ecran ReflectOS";
paques.html = "<h2 class=\"app-title\">Joyeuses Pâques</h2><div class=\"content\"><img src='/static/oeuf.png' alt='oeuf'/></div>";
paques.css = ".wid-paques .content{padding-top: 15% !important;text-align: center;}";
paques.optimalSize = 2;

paques.load = function(callback) {
	var result = paques.__proto__.load.call(paques,callback);
}

module.exports = paques;