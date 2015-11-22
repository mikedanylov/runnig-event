var mongoose = require('mongoose');

var numEventsSchema = {
  numEvents: {type: Number}
}

module.exports = new mongoose.Schema(numEventsSchema);
module.exports.numEventsSchema = numEventsSchema;