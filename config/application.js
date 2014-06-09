// Passport
var passport = require('passport');
// Passport Strategies
// @todo: Need to add LocalStrategy to passport
//var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GitHubStrategy = require('passport-github').Strategy;
// Local Settings
var local = require('./local');

var verifyHandler = function(token, tokenSecret, profile, done) {
	process.nextTick(function() {

		// Get User from DB that matched the profile ID
		User.findOne({'uid': profile.id}).done(function(err, user) {
			// If found, then user exists and we continue
			if(user) {
				return done(null, user);
			}

			console.log(profile);

			// If User is NOT found, we create in DB
			var data = {
				'provider': profile.provider,
				'uid': profile.id,
				'name': profile.displayName
			};

			if(profile.emails && profile.emails[0] && profile.emails[0].value) {
				data.email = profile.emails[0].value;
			}
			if(profile.name && profile.name.givenName) {
				data.firstname = profile.name.givenName;
			}
			if(profile.name && profile.name.familyName) {
				data.lastname = profile.name.familyName;
			}

			User.create(data).done(function(err, user) {
				return done(err, user);
			})
		});

	});
};

passport.serializeUser(function(user, done) {
	done(null, user.uid);
});

passport.deserializeUser(function(uid, done) {
	User.findOne({'uid': uid}).done(function(err, user) {
		done(err, user);
	})
});

module.exports = {
	'express': {
		'customMiddleware': function(app) {

			passport.use(new GitHubStrategy(local.github, verifyHandler));
			passport.use(new FacebookStrategy(local.facebook, verifyHandler));
			passport.use(new GoogleStrategy(local.google, verifyHandler));

			app.use(passport.initialize());
      app.use(passport.session());
		}
	}
};
