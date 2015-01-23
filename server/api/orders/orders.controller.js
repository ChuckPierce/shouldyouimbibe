'use strict';

var _ = require('lodash');
var Orders = require('./orders.model');
var braintree = require('braintree');
var request = require('request');

// Get list of orders
exports.index = function(req, res) {
  Orders.find(function (err, orders) {
    if(err) { return handleError(res, err); }
    return res.json(200, orders);
  });
};

// Get a single order
exports.show = function(req, res) {
  Orders.findById(req.params.id, function (err, order) {
    if(err) { return handleError(res, err); }
    if(!orders) { return res.send(404); }
    return res.json(order);
  });
};

// Creates a new orders in the DB.
exports.create = function(req, res) {
    Orders.create(req.body, function(err, orders) {
      if(err) { return handleError(res, err); }
      return res.json(201, orders);
    });
};

exports.createToken = function(req, res) {
  var clientToken = Orders.generateToken();
  clientToken.then(function(token) {
    return res.json(201, token);
  });
};

exports.postToDrizly = function(req, res) {
  request.get('https://sandbox.drizly.com/api/v2/auth/token?token="301cc08e728c8ccaa377c5b76f6c773b"', function(err, response, body) {
    return res.json(body);
  });
};

// Updates an existing orders in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Orders.findById(req.params.id, function (err, orders) {
    if (err) { return handleError(res, err); }
    if(!orders) { return res.send(404); }
    var updated = _.merge(orders, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, orders);
    });
  });
};

// Deletes a orders from the DB.
exports.destroy = function(req, res) {
  Orders.findById(req.params.id, function (err, orders) {
    if(err) { return handleError(res, err); }
    if(!orders) { return res.send(404); }
    orders.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}