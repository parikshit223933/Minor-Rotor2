const mongoose = require('mongoose');


// we will be taking the typical example of bulb and fan
// for bulb isTurnedOn and intensity are applicable
// for fan, speed and isTurnedOn are applicable
const state_schema = new mongoose.Schema(
	{
		admin:{
			type:mongoose.Schema.Types.ObjectId,
			ref:'User'
		},
		appliance: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Appliance',
			required: true,
		},
		isTurnedOn: {
			type: mongoose.Schema.Types.Boolean,
		},
		speed: {
			type: mongoose.Schema.Types.Number,
		},
		intensity: {
			type: mongoose.Schema.Types.Number,
		},
	},
	{
		timestamps: true,
	}
);

const state = mongoose.model('State', state_schema);
module.exports = state;
