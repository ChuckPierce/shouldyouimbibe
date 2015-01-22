'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrdersSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Orders', OrdersSchema);