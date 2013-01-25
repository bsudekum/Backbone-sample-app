(function($) {
Map = Backbone.Model.extend({

    initialize:function(mapUnits) {

        title = mapUnits.name
        thumb = "http://a.tiles.mapbox.com/v3/"+mapUnits.id+"/thumb.png";
        description = mapUnits.description
        download = "'"+mapUnits.download+"'"
        console.log(title)

        var compiled = _.template($("#templ").html());
        $("#here").append(compiled(title));

    }
});
 
mapList = Backbone.Collection.extend({
    initialize: function(){
        this.bind("add", function( model ){
            view.render( model );
        })
    },
    model: Map,
    sync: function(method, model, options) {
        var params = _.extend({
            type: 'GET',
            dataType: 'jsonp',
            url: model.url(),
        }, options);
        return $.ajax(params);
    },
    parse: function(response) {
        return response;
    },
 
    url: function() {
        return "http://api.tiles.mapbox.com/v3/"+$('.user-text').val()+"/tilesets.json";
    }
});
 



MapView = Backbone.View.extend({

    tagName: 'li',

    events: {
        'click #submit':  'getUser',
    },

    initialize: function() {
        this.mapList = new mapList;
        _.bindAll(this, 'render');
    }, 

    getUser: function() {
        var userName = $('.user-text').val();
        this.mapList.add( {user: userName} );
    },

    render: function( model ) {
        $(".nav-tabs").append("<li><a href='#"+ model.get("user")+"' data-toggle='tab'>"+ model.get("user")+"</li></a>");
        $(".tab-content").append("<div class='tab-pane' id='"+model.get("user")+"'><p>This is user: "+model.get("user")+"</p></div>")
        console.log('rendered')
        s = new mapList().fetch();;
    },

});

var view = new MapView({el: 'body'});

 


})(jQuery);