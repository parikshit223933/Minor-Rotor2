const chalk=require('chalk');
const {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} = require('http-status-codes');
const helper = require('../../../helpers/helper');

// create the initial state of the appliance for the requesting user
// req.body => {email, appliance_name, isTurnedOn, speed(in case of fan), intensity(in case of a bulb)}
module.exports.createState=(req, res)=>
{

}
// change the state of the appliance for the requesting user
// req.body => {email, appliance_name, new_isTurnedOn_state, new_speed(in case of fan), new_intensity(in case of a bulb)}
module.exports.changeState=(req, res)=>
{

}
// get current state of the appliance for the requesting user
// req.body => {email, appliance_name}
module.exports.getCurrentState=(req, res)=>
{

}
