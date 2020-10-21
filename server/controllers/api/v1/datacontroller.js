const User = require('../../../models/user');
const States = require('../../../models/State');
const Appliances = require('../../../models/Appliance');

module.exports.AllData = async function (req, res) {
	try {
		// console.log(req.cookies);

		let appliances = await Appliances.find({})
			.sort('-createdAt')
			.populate('admin')
			.populate({
				path: 'state',
				populate: {
					path: 'admin',
				},
			});
		let users = await User.find({});
		// console.log('---------users--------',users)
		// console.log('-----appliances---',appliances)
		return res.render('data', {
			title: 'Automation|DATA',
			appliances: appliances,
			all_users: users,
		});
	} catch (err) {
		console.log('Error', err);
	}
};
