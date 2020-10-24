const User = require('../models/user');
const States = require('../models/State');
const Appliances = require('../models/Appliance');

module.exports.AllData = async function (req, res) {
	try {
		let states = await States.find({})
		let appliances = await Appliances.find({})
			.sort('-createdAt')
			.populate('admin')
			.populate({
				path: 'state',
				populate: {
					path: 'admin',
				},
			});
		let users = await User.find({})
		.sort('-createdAt')
        .populate('appliances')
        .populate({ 
            path:'state',
            
        });
		return res.render('data', {
			title: 'Automation|DATA',
			appliances: appliances,
			all_users: users,
			states:states
		});
	} catch (err) {
		console.log('Error', err);
	}
};
