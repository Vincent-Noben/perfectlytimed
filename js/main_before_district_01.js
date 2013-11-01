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
		Fotos = new Index.Collections.Fotos();
		console.log("Collection loaded in view");
		Fotos.fetch({
			success: function () {
			console.log("Fetch succes");
			console.log(Fotos.toJSON());
			}
		});
	},

	render: function () {
		el: "#picturelist";
		var pictures_html = '';
		for (var Foto in Fotos) {
			console.log(Fotos.toJSON());
			pictures_html +=	'<li class="picture">';
			pictures_html += 		'<h2 class="h2">' + Fotos[Foto].get("title") + '</h2>';
			pictures_html += 		'<a href="' + Fotos[Foto].get("url") + '" data-lightbox=""><img src="' + Fotos[Foto].get("url") + '" alt="' + Fotos[Foto].get("title") + '"></a>';
			pictures_html += 		'<div class="clearfix commentslink">'
			pictures_html += 			'<div class="date">' + Fotos[Foto].get("date") + '</div>';
			pictures_html += 			'<div class="comments">' + Fotos[Foto].get("comments") + '</div>';
			pictures_html += 		'</div>';
			pictures_html +=		'</li>';
		};
		console.log("This is the html loaded in pictures_html: " + pictures_html);
		this.$el.html(pictures_html);
	}
});

var myHtmlView = new Index.Views.indexView();























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