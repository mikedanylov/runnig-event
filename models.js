var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner) {
  // mongoose.connect('mongodb://localhost:27017/running-events');
  mongoose.connect(
    'mongodb://mikedanylov:ps7vj590mongolab@ds053838.mongolab.com:53838/heroku_2f06jnj3'
    // 'mongodb://heroku_2f06jnj3:9e0hejakhjjqqll19savjbfsh8@ds053838.mongolab.com:53838/heroku_2f06jnj3' 
  );

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