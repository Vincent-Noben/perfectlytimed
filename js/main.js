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
		console.log("Movies JSON file initialized =/= it's loaded!!!");
	}
});

// VIEWS
Index.Views.indexView = Backbone.View.extend({
	el: "#picturelist",
		render: function () {
		var pictures_html = '';
		this.collection.each(function(foto){
			pictures_html +=	'<li class="picture">';
			pictures_html += 		'<h2 class="title" title=" ' + foto.get("title") + ' ">' + foto.get("title") + '</h2>';
			pictures_html += 		'<a href="' + foto.get("link") + '" data-lightbox="Tomcent"><img src="' + foto.get("link") + '" alt="' + foto.get("title") + '"></a>';
			pictures_html += 		'<div class="clearfix commentslink">'
			pictures_html += 			'<div class="date">' + foto.get("date") + '</div>';
			pictures_html += 			'<div class="comments">Comments</div>';
			pictures_html += 		'</div>';
			pictures_html +=	'</li>';
		});
		console.log("This is the html loaded in pictures_html: \n\n" + pictures_html);
		this.$el.html(pictures_html);
	}
});

var fotos = new Index.Collections.Fotos();

// ROUTERS
Index.Router = Backbone.Router.extend({
    routes: {
        ''			: 'home',
        'cat/:id'	: 'categoryView'
    }
});

var appRouter = new Index.Router();
appRouter.on('route:home', function () {
	console.log("Default route was chosen -> fetch fotos + render the myHtmlView");
	fotos.fetch({
		success: function () {
			console.log("Fetch of fotos success, now make the normal view");
			var myHtmlView = new Index.Views.indexView({collection: fotos});
			myHtmlView.render();
		}
	});	
});
appRouter.on('route:categoryView', function (id) {
	console.log("You chose the category " + id);
	fotos.fetch({
		success: function () {
			console.log("Fetch of fotos success, now make catfotos");
			var catfotos = fotos.where({ category:"testcat2"}); //testcat2 becomes id later!!!
			var myCatView = new Index.Views.indexView({collection: catfotos});
			myCatView.render();
		}
	});
});

Backbone.history.start();