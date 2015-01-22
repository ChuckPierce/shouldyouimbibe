'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('../user/user.model');

var BeerSchema = new Schema({
  name: String,
  description: String,
  brewery: String,
  style: String,
  rating: Number,
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Beer', BeerSchema);