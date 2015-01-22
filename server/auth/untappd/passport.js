var passport = require('passport');
var UntappdStrategy = require('passport-untappd').Strategy;

exports.setup = function(User, config) {
	passport.use(new UntappdStrategy({
  		clientID: '36470790E0B3A4B397A99FC76D2A3725C476A96E',
  		clientSecret: 'CEF1DD251FD03481ED8675CCD560E4277C2E36A0',
  		callbackURL: 'http://localhost:9000/auth/untappd/callback'
	}, 
		function(accessToken, refreshToken, profile, done) {
  			User.findOrCreate({ 'untappd': profile.id }, function(err, user) {
    			done(err, user);
  			});
		}
	));


};
	