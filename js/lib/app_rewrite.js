(function($){

	var templates = _($('scirpt[data-template]')).reduce(funtion(memo, el){
		memo[el.getAttribute('data-template')] = _(el.innerHTML).template();
		return memo;
	}, {});

	var Maps Backbone.Collection.extend({
		initialize: function(options){
			this.options = {};
			this.options.user = options.user;
		},
		url: funtion() {
			return "http://api.tiles.mapbox.com/v3/" + this.options.user + "/tilesets.json";
		}
	})

	var MainView = Backbone.View.extend({
		events: {
			'click #submit': 'getUser',
		},
		getUser: function() {
			Backbone.navigate('user/' + $('.user-text').val());
		}
	});

	var MapView = Backbone.View.extend({
		initialize:function(){
			this.render();
		},
		render: function() {
			$('.maps', this.el).empty();
			var view = this;
			this.collection.each(function(m){
				$('.maps', view.el).append(templates.map(m));
			});
		}
	});

	var Router = Backbone.Router.extend({
		initialize: function() {
			new MainView({el: 'body'});
		},
		routes: {
			'user/:user' : 'userMaps'
		},
		userMaps: function(user) {
			(new Maps({user: user})).fetch({
				success: function(map){
					var view = new MapView({collection: maps});
					$('nav-tabs').attach(view.el);
				},
				error: function() {
					alert("User not valid")
				}
			});
		}
	});

	new Router();
	Backbone.history.start();

})(jQuery)