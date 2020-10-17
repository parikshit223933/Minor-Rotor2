const mongoose = require('mongoose');

const state_schema = new mongoose.Schema(
	{
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
		temperature: {
			type: mongoose.Schema.Types.Decimal128,
		},
		intensity: {
			type: mongoose.Schema.Types.Number,
		},
	},
	{
		timestamps: true,
	}
);

const state = mongoose.model('State', appliance_schema);
module.exports = state;
