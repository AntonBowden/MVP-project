var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
//var database = require('./config/database');

app.use(express.static(__dirname + '/public'));
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());
// app.use(bodyParser.json({
//     type: 'application/vnd.api+json'
// })); // parse application/vnd.api+json as json

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 1337;
var ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';




mongoose.connect('mongodb://localhost/taskAtHand'); // connect to mongoDB database
var db = mongoose.connection;
db.on('>>>>>>>ERROR:', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('HUGE SUCCESS! MONGO CONNECTION ESTABLISHED!');
});

// load the routes
require('./app/routes')(app);

// listen
app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;
