// set up ========================
var express  = require('express');
var app      = express();                 // create our app w/ express

// configuration =================
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));     // set the static files location /public/img will be /img for users
app.use(express.logger('dev'));             // log every request to the console. Other options: 'default', 'short', 'tiny', 'dev'
app.use(express.bodyParser());              // pull information from html in POST
// app.use(express.methodOverride());            // simulate DELETE and PUT

// listen (start app with node server.js) ===============================
app.listen(app.get('port'));
console.log('Express server started on port ' + app.get('port'));