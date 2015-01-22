'use strict';

var _ = require('lodash');
var Beer = require('./beer.model');

// Get list of beers
exports.index = function(req, res) {
  Beer.find(function (err, beers) {
    if(err) { return handleError(res, err); }
    return res.json(200, beers);
  });
};

// Get a single beer
exports.show = function(req, res) {
  Beer.findById(req.params.id, function (err, beer) {
    if(err) { return handleError(res, err); }
    if(!beer) { return res.send(404); }
    return res.json(beer);
  });
};

// Creates a new beer in the DB.
exports.create = function(req, res) {
  Beer.create(req.body, function(err, beer) {
    if(err) { return handleError(res, err); }
    return res.json(201, beer);
  });
};

// Updates an existing beer in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Beer.findById(req.params.id, function (err, beer) {
    if (err) { return handleError(res, err); }
    if(!beer) { return res.send(404); }
    var updated = _.merge(beer, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, beer);
    });
  });
};

// Deletes a beer from the DB.
exports.destroy = function(req, res) {
  Beer.findById(req.params.id, function (err, beer) {
    if(err) { return handleError(res, err); }
    if(!beer) { return res.send(404); }
    beer.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}