
// var server = require('./server');
var express = require('express');
var wagner = require('wagner-core');
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var EventSchema = require('./schema/Event.js');

require('./models')(wagner);

var app = express();

app.use('/api/', require('./api')(wagner));
app.use(express.static(__dirname + '/public'));

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
