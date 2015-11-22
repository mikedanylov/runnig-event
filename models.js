var mongoose = require('mongoose');
var _ = require('underscore');
var uristring =
    // process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    // process.env.PROD_MONGODB ||
    'mongodb://localhost:27017/running-events';

module.exports = function(wagner) {

  // Makes connection asynchronously.  Mongoose will queue up database
  // operations and release them when the connection is complete.
  mongoose.connect(uristring, function (err, res) {
    if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
    console.log ('Succeeded connected to: ' + uristring);
    }
  });

  var Event =
    mongoose.model('Event', require('./schema/Event'), 'Events');
  var numEvents =
    mongoose.model('numEvents', require('./schema/numEvents'), 'numEvents');
  var totalDist =
    mongoose.model('totalDist', require('./schema/totalDist'), 'totalDist');

  var models = {
    Event: Event,
    numEvents: numEvents,
    totalDist: totalDist
  };

  // To ensure DRY-ness, register factories in a loop
  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

  return models;
};