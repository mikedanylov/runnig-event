var express = require('express');
var status = require('http-status');

module.exports = function(wagner) {
  var api = express.Router();

  api.get('/events/', wagner.invoke(function(Event) {
    return function(req, res) {
      Event.find({}, function(error, evnts) {
        if (error) {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: error.toString() });
        }
        if (!evnts) {
          return res.
            status(status.NOT_FOUND).
            json({ error: 'Not found' });
        }
        res.json({ evnts: evnts });
      });
    };
  }));

  api.get('/num-events/', wagner.invoke(function(numEvents) {
    return function(req, res) {
      numEvents.find({}, function(error, nEvents) {
        if (error) {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: error.toString() });
        }
        if (!nEvents) {
          return res.
            status(status.NOT_FOUND).
            json({ error: 'Not found' });
        }
        res.json({ nEvents: nEvents });
      });
    };
  }));

  api.get('/total-dist/', wagner.invoke(function(totalDist) {
    return function(req, res) {
      totalDist.find({}, function(error, distance) {
        if (error) {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: error.toString() });
        }
        if (!distance) {
          return res.
            status(status.NOT_FOUND).
            json({ error: 'Not found' });
        }
        res.json({ distance: distance });
      });
    };
  }));

  return api;
};
