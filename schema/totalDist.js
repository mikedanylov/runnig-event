var mongoose = require('mongoose');

var totalDistSchema = {
  totalDist: {type: Number}
}

module.exports = new mongoose.Schema(totalDistSchema);
module.exports.totalDistSchema = totalDistSchema;
