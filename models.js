var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner) {
  mongoose.connect('mongodb://localhost:27017/running-events');

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