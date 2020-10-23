const User = require('../models/user');
const States = require('../models/State');
const Appliances = require('../models/Appliance');

module.exports.AllData = async function (req, res) {
	try {
		// console.log(req.cookies);

		let states = await States.find({})
		// .sort('-createdAt')
		// .populate({
		// 	path: 'appliances',
		// 	populate: {
		// 		path: 'admin',
		// 	},
		// });
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
		console.log('---------users--------',states)
		// console.log('-----appliances---',appliances)
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
