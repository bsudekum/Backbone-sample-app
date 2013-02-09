(function($) {

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
        Backbone.navigate('user/' + $('.user-text').val());
    },
    render: function() {
        $('#main').empty().append(templates.main());
    }
});

var MapView = Backbone.View.extend({
    initialize: function() {
        this.render();
    },
    render: function() {
        $('.maps', this.el).empty();
        var view = this;
        this.collection.each(function(m) {
            $('.maps', view.el).append(templates.map(m));
        });
    }
});


var Router = Backbone.Router.extend({
    initialize: function() {
        new MainView();
    },
    // routes configuration
    routes: {
        'user/:user' : 'userMaps'
    },
    userMaps: function(user) {
        // Todo: display spinner
        (new Maps({user: user})).fetch({
            success: function(maps) {
                // Render view.
                var view = new MapView({collection: maps});
                $('.nav-tabs').attach(view.el);
            },
            error: function() {
                // display some sort of error message
            }
        });
    }
});

new Router();
Backbone.history.start();

})(jQuery);
