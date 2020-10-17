const mongoose = require('mongoose');

const appliance_schema = new mongoose.Schema(
	{
		admin:{
			type:mongoose.Schema.Types.ObjectId,
			ref:'User'
		},
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
