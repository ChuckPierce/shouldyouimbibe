'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'beerme-secret'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  untappd: {
    clientID:     process.env.UNTAPPD_ID || '36470790E0B3A4B397A99FC76D2A3725C476A96E',
    clientSecret: process.env.UNTAPPD_SECRET || 'CEF1DD251FD03481ED8675CCD560E4277C2E36A0',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/untappd/callback'
  },
  
  twitter: {
    clientID:     process.env.TWITTER_ID || '4Tau3XHECsNP8aJ6eHrZbRseL',
    clientSecret: process.env.TWITTER_SECRET || 'vFop4i1OeNNlKIImF86pZUb2ByKFCav79LoDKaYp2A6wQUwnXn',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback',
    accessTokenKey: process.env.TWITTER_ACCESS_KEY || '376346905-1YUpNc177GqbeDBp4mUBfvWKcnqakVPrY1IAq01G',
    accessTokenSecret: process.env.TWITTER_ACCESS_SECRET || 'E11pcskAxO3aSkkWKtIVSDGZV5qs63104XgbKPgK22YEC',
    userToken: '',
    userSecret: ''
  },

  drizly: {
    dToken: '',
    partner_token: process.env.DRIZLY_ID || '301cc08e728c8ccaa377c5b76f6c773b'
  }

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});