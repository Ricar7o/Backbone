// Source code for Backbone.js functionality in this tutorial

// This prefilter hooks into all AJAX requests and makes sure to send them
// to a remote server, rather than to localhost
$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
  options.url = 'http://backbonejs-beginner.herokuapp.com' + options.url;
});

// Adding functionality to serialize (convert form to JSON object)
// because jQuery doesn't support this natively.
// Takes name properties of the form into an object
$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
      if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
              o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
      } else {
          o[this.name] = this.value || '';
      }
  });
  return o;
};

var Users = Backbone.Collection.extend({
  url: '/users'
});

var User = Backbone.Model.extend({
  urlRoot: '/users'
});

var UserList = Backbone.View.extend({
  el: '.page',
  render: function() {
    var that = this; // By creating this variable, we make sure that we can pass it to the success function
    var users = new Users();
    users.fetch({
      success: function(users) { // this is an anonymous function and it can't read 'this' because it isn't in scope. Solve with 'that'
        var template = _.template($('#user-list-template').html(), {users: users.models});
        that.$el.html(template);
      }
    });
  }
});

var EditUser = Backbone.View.extend({
  el: '.page',
  render: function(options) {
    var that = this;
    if (options.id) { // If there is already a user present, populate with the relevant fields
      this.user = new User({id: options.id});
      this.user.fetch({
        success: function(user) {
          var template = _.template($('#edit-user-template').html(), {user: user});
          that.$el.html(template);
        }
      });
    } else {
      var template = _.template($('#edit-user-template').html(), {user: null});
      this.$el.html(template);
    }
  },
  events: {
    'submit #edit-user-form': 'saveUser',
    'click .delete': 'destroyUser'
  },
  saveUser: function(ev) {
    ev.preventDefault();
    var userDetails = $(ev.currentTarget).serializeObject();
    var user = new User();
    user.save(userDetails, {
      success: function() {
        router.navigate('', {trigger: true});
      }
    });
  },
  destroyUser: function(ev) {
    ev.preventDefault();
    this.user.destroy({
      success: function() {
        router.navigate('', {trigger: true});
      }
    });
  }
});

var Router = Backbone.Router.extend({
  routes: {
    ''        : 'home',
    'new'     : 'editUser',
    'edit/:id': 'editUser'
  }
});

var userList = new UserList();
var editUser = new EditUser();
var router = new Router();

router.on('route:home', function() {
  userList.render();
});
router.on('route:editUser', function(id) {
  editUser.render({id: id});
});

Backbone.history.start();
