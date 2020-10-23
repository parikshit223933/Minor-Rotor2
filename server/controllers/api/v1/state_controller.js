const chalk = require('chalk');
const { ReasonPhrases, StatusCodes } = require('http-status-codes');
const helper = require('../../../helpers/helper');
const appliance_constants = require('../../../constants/appliance');
const applianceToStateMapping = require('../../../constants/appliance_to_state_mapping');
const changeCase = require('change-case');
const State = require('../../../models/State');
const User = require('../../../models/user');
const Appliance = require('../../../models/Appliance');

// return all the states for this appliance
// req.body => { appliance_name }
module.exports.getStateNamesForAppliance = (req, res) => {
	const appliance_name = req.body.appliance_name;
	if (!appliance_name) {
		return res.status(StatusCodes.NOT_ACCEPTABLE).json({
			success: false,
			message: 'Appliance name is not provided',
			data: {},
		});
	}

	if (!appliance_constants.allAppliances.includes(appliance_name)) {
		return res.status(StatusCodes.NOT_ACCEPTABLE).json({
			success: false,
			message: 'This appliance is not yet supported!',
			data: {},
		});
	}

	const all_states_for_this_appliance =
		applianceToStateMapping[appliance_name];
	const states_in_capital_case = all_states_for_this_appliance.map(
		(state) => {
			return changeCase.capitalCase(state);
		}
	);

	return res.status(StatusCodes.OK).json({
		success: true,
		message: 'Appliance States',
		data: { states: states_in_capital_case },
	});
};

//req.body => {user_id, selected_appliances: []}
module.exports.selectAppliances = async (req, res) => {
	const { user_id, selected_appliances } = req.body;

	if (!user_id) {
		return helper.response(
			res,
			StatusCodes.NOT_ACCEPTABLE,
			false,
			'Something went wrong! Contact the administrator!'
		);
	}
	if (selected_appliances.length == 0) {
		return helper.response(
			res,
			StatusCodes.NOT_ACCEPTABLE,
			false,
			'No Appliance Selected!'
		);
	}
	let appliances_response = [];
	try {
		let user = await User.findById(user_id).populate({
			path: 'appliances',
			populate: {
				path: 'state',
			},
		});
		if (user.hasSelectedAppliances) {
			return helper.response(
				res,
				StatusCodes.CONFLICT,
				false,
				'You have already selected your appliances'
			);
		}
		// user will always be found and in case user is not found, it will be handled by jwt, not by this controller.

		for (let appl of selected_appliances) {
			if (appliance_constants.allAppliances.includes(appl)) {
				let appliance = await Appliance.create({
					admin: user.id,
					name: appl,
				});
				let state = await State.create({
					appliance: appliance.id,
					admin: user.id,
				});
				appliance.state=state.id;
				user.appliances.push(appliance.id);
				await appliance.save();
				await state.save();
				let new_mapping = { [appliance.name]: {} };

				applianceToStateMapping[appliance.name].forEach((property) => {
					new_mapping[appliance.name][property] = state[property];
				});
				appliances_response.push(new_mapping);
			}
		}
		user.hasSelectedAppliances = true;
		await user.save();
		return await helper.response(
			res,
			StatusCodes.OK,
			true,
			'Appliances Saved!',
			{
				selected_appliances: appliances_response,
				user: {
					name: user.name,
					email: user.email,
					hasSelectedAppliances: user.hasSelectedAppliances,
				},
			}
		);
	} catch (error) {
		console.log(chalk.redBright.bold('ERROR ON PLACE 1'), error);
		return helper.internalServerError(res);
	}
};

// get current state of the appliance for the requesting user
// req.body => {user_id}
module.exports.getAllApplianceStatesForThisUser = async (req, res) => {
	const { user_id } = req.body;
	if (!user_id) {
		return helper.response(
			res,
			StatusCodes.CONFLICT,
			false,
			'Please login again!'
		);
	}
	try {
		let user = await User.findById(user_id).populate({
			path: 'appliances',
			populate: {
				path: 'state',
			},
		});
		if (!user) {
			return helper.response(
				res,
				StatusCodes.CONFLICT,
				false,
				'Please login again!'
			);
		}

		if (!user.hasSelectedAppliances) {
			return helper.response(
				res,
				StatusCodes.OK,
				true,
				'Appliance States',
				{
					user: {
						name: user.name,
						email: user.email,
						hasSelectedAppliances: user.hasSelectedAppliances,
					},
					selected_appliances: [],
				}
			);
		}
		let appliances_response = [];
		for (let appl of user.appliances) {
			let appliance = appl;
			let state = appl.state;
			let new_mapping = { [appliance.name]: {} };

			applianceToStateMapping[appliance.name].forEach((property) => {
				new_mapping[appliance.name][property] = state[property];
			});
			appliances_response.push(new_mapping);
		}

		return helper.response(res, StatusCodes.OK, true, 'Appliance states', {
			user: {
				name: user.name,
				email: user.email,
				hasSelectedAppliances: user.hasSelectedAppliances,
			},
			selected_appliances: appliances_response,
		});
	} catch (error) {
		console.log(chalk.redBright.bold('There was an error!'), error);
		return helper.internalServerError(res);
	}
};

// change the state of the appliance for the requesting user
// req.body => {email, appliance_name, new_isTurnedOn_state, new_speed(in case of fan), new_intensity(in case of a bulb)}
module.exports.changeState = async (req, res) => {
	const { email, appliance_name, ...new_states } = req.body;
	if (!email || !appliance_name) {
		return helper.response(
			res,
			StatusCodes.NOT_ACCEPTABLE,
			false,
			'No appliance selected!'
		);
	}
	if (!appliance_constants.allAppliances.includes(appliance_name)) {
		return helper.response(
			res,
			StatusCodes.NOT_ACCEPTABLE,
			false,
			'Selected appliance is not supported!'
		);
	}
	const all_states_of_selected_appliance =
		applianceToStateMapping[appliance_name];
	const are_all_recieved_state_names_correct = Object.keys(new_states).map(
		(new_state_name) => {
			return all_states_of_selected_appliance.includes(new_state_name);
		}
	);
	if (are_all_recieved_state_names_correct.includes(false)) {
		return helper.response(
			res,
			StatusCodes.NOT_ACCEPTABLE,
			false,
			'One of the state names recieved are in the wrong format'
		);
	}
	// finally we can update the state!
	try {
		let user = await User.findOne({ email: email });
		let appliance = await Appliance.findOne({ name: appliance_name });
		if (!user || !appliance) {
			return helper.internalServerError(res);
		}
		let state = await State.findOne({
			admin: user.id,
			appliance: appliance.id,
		});
		if (!state) {
			return helper.response(
				res,
				StatusCodes.BAD_REQUEST,
				false,
				'This state does not exist!'
			);
		}
		all_states_of_selected_appliance.forEach((new_state_name) => {
			state[new_state_name] = new_states[new_state_name];
		});
		await state.save();
		return helper.response(
			res,
			StatusCodes.OK,
			true,
			'State changed successfully!',
			all_states_of_selected_appliance.map((new_state_name) => {
				return { new_state_name: state[new_state_name] };
			})
		);
	} catch (error) {
		console.log(chalk.redBright.bold(error));
		return helper.internalServerError(res);
	}
};