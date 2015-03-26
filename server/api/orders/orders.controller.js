'use strict';

var _ = require('lodash');
var Orders = require('./orders.model');
var braintree = require('braintree');
var request = require('request');
var config = require('../../config/environment');
var qs = require('qs');

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

exports.createDrizlyToken = function(req, res) {
  request.post('https://sandbox.drizly.com/api/v3/auth/token?partner_token='+config.drizly.partner_token, function(err, response, body) {
   var parsed = JSON.parse(body)
   console.log('parsed body', parsed);
    config.drizly.dToken = parsed.token;
     return res.json(parsed);
  });
};

exports.productFind = function(req, res) {
  var location = {latitude: req.body.lat, longitude: req.body.lon};
  console.log(config.drizly.dToken.token);
  request.get('https://sandbox.drizly.com/api/v3/catalog/search?location%5Blatitude%5D='+location.latitude+'&location%5Blongitude%5D='+location.latitude+'&q='+ req.body.searchTerm +'&partner_token='+config.drizly.partner_token+'&token='+ config.drizly.dToken.token, function(err, response, body) {
          // console.log('response from drizly', body);
          return res.json(body);
  });
};

exports.postToDrizly = function(req, res) {
  console.log('got here');
  var nameArr = req.body.delivery_address.full_name.split(" ");
  req.body.delivery_address.first_name = nameArr[0];
  req.body.delivery_address.last_name = nameArr[1];
  delete req.body.delivery_address.full_name
  console.log(req.body);
  var qString = qs.stringify(req.body);
  console.log(qString);
  // console.log(config.drizly.dToken.token);
  request.get('https://sandbox.drizly.com/api/v3/checkout/payment_client_token?partner_token='+config.drizly.partner_token+'&token='+ config.drizly.dToken.token, function(err, response, body) {
          // console.log('response from drizly', body);
          var prepare = JSON.parse(body);
          var prepareToken = prepare.payment_client_token;
          request.post('https://sandbox.drizly.com/api/v3/checkout/process?partner_token='+config.drizly.partner_token+'&token='+ config.drizly.dToken.token+'&payment_client_token='+ prepareToken + qString, function(err, response, payment) {
            console.log(payment);
            // return res.send(200);
            return res.json(JSON.parse(payment));
          });
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