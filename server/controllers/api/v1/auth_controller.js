const { ReasonPhrases, StatusCodes } = require('http-status-codes');
const User = require('../../../models/user');
const chalk = require('chalk');
const helper = require('../../../helpers/helper');
const jwt = require('jsonwebtoken');
const env=require('../../../environment/environment');
let passportJWTSecret = env.passportJWTSecret;

// req.body => {name, email, password, confirmPassword}
module.exports.signUp = async (req, res) => {
	const name = req.body.name;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;
	const email = req.body.email;
	// one of the required fields is empty
	if (!name || !email || !confirmPassword || !password) {
		return res.status(StatusCodes.FORBIDDEN).json({
			success: false,
			message: 'Please fill all the fields',
			data: {},
		});
	}
	// password is not same as confirm password
	if (confirmPassword != password) {
		return res.status(StatusCodes.NOT_ACCEPTABLE).json({
			success: false,
			message: 'Passwords do not match!',
			data: {},
		});
	}
	// does the user already exists in the database?
	try {
		let isExistingUser = await User.findOne({ email: email });
		if (isExistingUser) {
			return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
				success: false,
				message: 'User already exists.',
				data: {},
			});
		} else {
			try {
				let user = await User.create({
					email,
					password,
					name,
				});
				await user.save();
				return res.status(StatusCodes.OK).json({
					success: true,
					message: 'Account created successfully!',
					data: {
						token: jwt.sign(
							{
								email: user.email,
								name: user.name,
								_id: user.id,
							},
							passportJWTSecret,
							{ expiresIn: (1000 * 60 * 60 * 24).toString() }
						),
						user: {
							name: user.name,
							email: user.email,
							hasSelectedAppliances: user.hasSelectedAppliances,
						},
					},
				});
			} catch (error) {
				console.log(chalk.redBright.bold(error));
				return helper.internalServerError(res);
			}
		}
	} catch (error) {
		console.log(chalk.redBright.bold(error));
		return helper.internalServerError(res);
	}
};

// req.body => {email, password}
module.exports.signIn = async (req, res) => {
	const email = req.body ? req.body.email : undefined;
	const password = req.body ? req.body.password : undefined;

	if (!email || !password) {
		return res.status(StatusCodes.NO_CONTENT).json({
			success: false,
			message: 'Please fill in all the fields!',
			data: {},
		});
	}

	try {
		let user = await User.findOne({ email });
		if (user) {
			if (user.password.toString() != password) {
				return res.status(StatusCodes.NOT_ACCEPTABLE).json({
					success: false,
					message: 'Email id or password is in correct!',
					data: {},
				});
			} else {
				return res.status(StatusCodes.OK).json({
					success: true,
					message: 'Logged in successfully',
					data: {
						token: jwt.sign(
							{
								email: user.email,
								name: user.name,
								_id: user.id,
							},
							passportJWTSecret,
							{ expiresIn: (1000 * 60 * 60 * 24).toString() }
						),

						user: {
							name: user.name,
							email: user.email,
							hasSelectedAppliances: user.hasSelectedAppliances,
						},
					},
				});
			}
		} else {
			return res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				message: 'Account does not exist!',
				data: {},
			});
		}
	} catch (error) {
		console.log(chalk.redBright.bold(error));
		return helper.internalServerError(res);
	}
};
// req.body => {name, email, _id}
module.exports.authenticateUser = async (req, res) => {
	const { name, email, _id } = req.body;
	let user = await User.findById(_id);

	return helper.response(res, StatusCodes.OK, true, 'Authenticated', {
		user: {
			name,
			email,
			hasSelectedAppliances: user.hasSelectedAppliances,
		},
	});
};
