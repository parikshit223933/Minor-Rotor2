const chalk = require('chalk');
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const passportJWTSecret = 'something';

passport.use(
	JWTStrategy(
		{
			jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken,
			secretOrKey: passportJWTSecret,
		},
		function (jwtPayLoad, done) {
			User.findById(jwtPayLoad._id, function (error, user) {
				if (error) {
					console.log(chalk.redBright(error));
					return;
				}
				if (user) {
					done(null, user);
				}
				console.log(chalk.redBright.bold('User not found!'));
				return done(null, false);
			});
		}
	)
);

module.exports=passport;