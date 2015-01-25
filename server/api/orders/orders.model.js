'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Uesr = require('../user/user.model'),
    braintree = require('braintree'),
    Q = require('q'),
    request = require('request');

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "gkf8rjgtf6pryzft",
  publicKey: "4q4b4vfw244q8pdt",
  privateKey: "8a809411efb262b3f3243be283d96e8a"
});

var states = 'created processing cancelled completed'.split(' ');

var lineItemsSchema = new Schema({
  productId: String,
  productName: String,
  price: Number,
  quantity: Number,
  image: String
});

var OrdersSchema = new Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  lineItems: {type:[lineItemsSchema]},
  status: {type: String, default:'created', enum: states},
  date: Date,
  shipping: {},
  billing: {},
  clientToken: String
});

OrdersSchema.statics.generateToken = function() {
	var deferral = Q.defer();
	gateway.clientToken.generate({}, function (err, response) {
  		var clientToken = response.clientToken
  		deferral.resolve(clientToken);
	});
	return deferral.promise;
}

OrdersSchema.statics.generateDrizlyToken =  function() {
  var deferral = Q.defer();
  request.get('https://sandbox.drizly.com/api/v2/auth/token?partner_token=301cc08e728c8ccaa377c5b76f6c773b', function(err, response, body) {
    // console.log(body);
    deferral.resolve(JSON.parse(body));
    
  });
  return deferral.promise;
};

module.exports = mongoose.model('Orders', OrdersSchema);