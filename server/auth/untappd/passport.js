var passport = require('passport');
var UntappdStrategy = require('passport-untappd').Strategy;

exports.setup = function(User, config) {
	passport.use(new UntappdStrategy({
  		clientID: config.untappd.clientID,
  		clientSecret: config.untappd.clientSecret,
  		callbackURL: config.untappd.callbackURL
	}, 
		function(accessToken, refreshToken, profile, done) {
  			User.findOne({ 
  				'untappdId': profile.id 
  			}, function(err, user) {
  				if(err) {
  					return done(err);
  				}
  				if(!user) {
  					user = new User({
  						name: profile.displayName,
  						email: profile.emails[0].value,
  						role: 'user',
  						provider: 'untappd',
  						untappdId: profile.id,
              accessToken: accessToken
  					});
  					user.save(function(err) {
  						if (err) return done(err);
  						return done(err, user);
  					});
  				} else {
  					return done(err, user);
  				}
  			});
		}
	));


};
	