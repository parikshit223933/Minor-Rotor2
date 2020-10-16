module.exports.home = (req, res) => {
	res.status(200).json({
		server: 'started',
	});
};
