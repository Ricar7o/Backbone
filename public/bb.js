// Source code for Backbone.js functionality in this tutorial

var Router = Backbone.Router.extend({
  routes: {
    '': 'home'
  }
});

var router = new Router();
router.on('route:home', function() {
  console.log('Loaded homepage');
});
Backbone.history.start();
