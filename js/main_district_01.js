console.log("main.js loaded from index.html");

var Index = {
	Models: {},
	Collections: {},
	Views: {},
	Templates:{}
}

// MODELS
Index.Models.Foto = Backbone.Model.extend({
	defaults: {
		"id":"",
		"title":"title",
		"link":"",
		"category":""
	}
});

// COLLECTIONS
Index.Collections.Fotos = Backbone.Collection.extend({
	model: Index.Models.Foto,
	url: "js/data/modellist.json",
	initialize: function () {
		console.log("Movies initialized");
	}
});

// TESTVIEW
Index.Views.testView = Backbone.View.extend({
	initialize: function () {
		var that=this;
		this.collection = new Index.Collections.Fotos();
		console.log("Collection loaded in view");
		this.collection.fetch({
			success: function () {
			that.render();
			}
		});
	},
	render: function () {
		console.log("test", this.collection.toJSON());
	}
});
// var myTestView = new Index.Views.testView();

// VIEWS
Index.Views.indexView = Backbone.View.extend({
	initialize: function () {
		var that=this;
	},

	render: function () {
		el: "#picturelist";
		var pictures_html = '';

		// Stap 4: .get('property') werkt enkel op echte backbone-models, niet de '.toJSON' varianten. Loopen over de collection doen we met de eenvoudige ingebouwde .each methode. (is undescore.js code)

		this.collection.each(function(foto){
			pictures_html +=	'<li class="picture">';
			pictures_html += 		'<h2 class="h2">' + foto.get("title") + '</h2>';
			pictures_html += 		'<a href="' + foto.get("url") + '" data-lightbox=""><img src="' + foto.get("url") + '" alt="' + foto.get("title") + '"></a>';
			pictures_html += 		'<div class="clearfix commentslink">'
			pictures_html += 			'<div class="date">' + foto.get("date") + '</div>';
			pictures_html += 			'<div class="comments">' + foto.get("comments") + '</div>';
			pictures_html += 		'</div>';
			pictures_html +=		'</li>';
		});
		console.log("This is the html loaded in pictures_html: " + pictures_html);
		// There, i fixed it! Als je nog vragen hebt over "hoe" het nu net gefixt is, tweet up! ;), groetjes, Laurens & Mante
		this.$el.html(pictures_html);
	}
});

// Stap 1: Eerst maken we een nieuwe instantie van de collection fotos aan
var fotos = new Index.Collections.Fotos();

// Stap 2: Dan maken we een nieuwe instantie van de view fotos aan, we geven de collection daar op onderstaande manier aan mee.
var myHtmlView = new Index.Views.indexView({collection: fotos});

// Stap 3: De collection opvullen
fotos.fetch({
	success: function () {
	console.log("Fetch succes");
	console.log(fotos.toJSON());
	}
});























// ROUTERS
/*
Index.Router = Backbone.Router.extend({
    routes: {
        "": "defaultRoute" //http://localhost:22257/Theater/theater.htm
    },

    defaultRoute: function () {
        console.log("defaultRoute");
        var fotos = new Index.Collections.Fotos()
        fotos.fetch();
        console.log(fotos.length)
    }
})

var appRouter = new Index.Router();
*/
Backbone.history.start();