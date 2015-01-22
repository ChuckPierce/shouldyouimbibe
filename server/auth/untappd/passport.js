var passport = require('passport');
var UntappdStrategy = require('passport-untappd').Strategy;

exports.setup = function(User, config) {
	passport.use(new UntappdStrategy({
  		clientID: '36470790E0B3A4B397A99FC76D2A3725C476A96E',
  		clientSecret: 'CEF1DD251FD03481ED8675CCD560E4277C2E36A0',
  		callbackURL: 'http://localhost:9000/auth/untappd/callback'
	}, 
		function(accessToken, refreshToken, profile, done) {
  			User.findOne({ 
  				'untappd.id': profile.id 
  			}, function(err, user) {
  				if(!user) {
  					user = new User({
  						name: profile.displayName,
  						email: profile.emails[0].value,
  						role: 'user',
  						provider: 'untappd',
  						untappd: profile._json
  					});
  					user.save(function(err) {
  						if (err) done(err);
  						return done(err, user);
  					});
  				} else {
  					done(err, user);
  				}
  			});
		}
	));


};
	