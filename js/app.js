(function($) {

var templates =  _($('script[data-template]')).reduce(function(memo, el) {
  memo[el.getAttribute('data-template')] = _(el.innerHTML).template();
  return memo;
}, {});




var Maps = Backbone.Collection.extend({
    initialize: function(options) {
        this.options = {};
        this.options.user = options.user;
    },
    url: function() {
        return "http://api.tiles.mapbox.com/v3/" + this.options.user + "/tilesets.json";
    }
});

var MainView = Backbone.View.extend({
    events: {
        'click #submit':  'getUser',
    },
    getUser: function() {
        Backbone.history.navigate('user/' + $('.user-text').val());

    }
});

var MapView = Backbone.View.extend({
    initialize: function() {
        this.render();
    },
    render: function() {
        var template = _.template( $('#user-template'), {} );
            // Load the compiled HTML into the Backbone "el"
            this.$el.html( template );
    }
});


var Router = Backbone.Router.extend({
    initialize: function() {
        new MainView({el: 'body'});
    },
    // routes configuration
    routes: {
        'user/:user' : 'userMaps'
    },
    userMaps: function(user) {
        // Todo: display spinner
        (new Maps({user: user})).fetch({
            success: function(map) {
                // Render view.
                var view = new MapView({collection: map});
                $('.nav-tabs').append(view.el);

            },
            error: function() {
                // display some sort of error message
            }
        });
    }
});

new Router();
Backbone.history.start();
var map_view = new MapView({ el: $('.container') });
})(jQuery);
