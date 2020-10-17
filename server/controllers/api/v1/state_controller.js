const chalk = require('chalk');
const {
	ReasonPhrases,
	StatusCodes,
} = require('http-status-codes');
const helper = require('../../../helpers/helper');
const appliance = require('../../../constants/appliance');
const applianceToStateMapping = require('../../../constants/appliance_to_state_mapping');
const changeCase = require('change-case');

// return all the states for this appliance
// req.body => { appliance_name }
module.exports.getStatesForAppliance = (req, res) => {
	const appliance_name = req.body.appliance_name;
	if (!appliance_name) {
		return res.status(StatusCodes.NOT_ACCEPTABLE).json({
			success: false,
			message: 'Appliance name is not provided',
			data: {},
		});
	}

	if (!appliance.allAppliances.includes(appliance_name)) {
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

// change the state of the appliance for the requesting user
// req.body => {email, appliance_name, new_isTurnedOn_state, new_speed(in case of fan), new_intensity(in case of a bulb)}
module.exports.changeState = (req, res) => {
  
};

// get current state of the appliance for the requesting user
// req.body => {email, appliance_name}
module.exports.getCurrentState = (req, res) => {};
