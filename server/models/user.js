const mongoose = require('mongoose');

const user_schema = new mongoose.Schema(
	{
		name: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
		email: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
		password: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
		appliances: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Appliance',
			},
		],
		hasSelectedAppliances:{
			type:Boolean,
			default:false,
		}
	},
	{
		timestamps: true,
	}
);

const user = mongoose.model('User', user_schema);
module.exports = user;
