const chalk = require('chalk');
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
let passportJWTSecret = 'something';

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: passportJWTSecret,
		},
		function (jwtPayLoad, done) {
			try {
				User.findById(jwtPayLoad._id, function (error, user) {
					if (error) {
						console.log(chalk.redBright(error));
						return;
					}
					if (user) {
						return done(null, user);
					}
					return done(null, false);
				});
			} catch (error) {
				console.log(error);
			}
		}
	)
);

module.exports = passport;
