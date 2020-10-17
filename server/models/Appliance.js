const mongoose = require('mongoose');

const appliance_schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		state: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'State',
		},
	},
	{
		timestamps: true,
	}
);

const appliance = mongoose.model('Appliance', appliance_schema);
module.exports = appliance;
