var mongoose = require('mongoose');

var EventSchema = {
  eventName: {type: String, required: true},
  eventLocation: {type: String},
  eventDate: {type: String, required: true},
  latitude: {type: Number, required: true},
  longitude: {type: Number, required: true}
}

module.exports = new mongoose.Schema(EventSchema);
module.exports.EventSchema = EventSchema;
