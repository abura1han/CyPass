const { User } = require('../models');

const myInfoController = async (req, res) => {
	try {
		const data = await User.findOne({ include: "Business_profile", where: { id: req.User.id } });
		res.status(200).json({ success: true, data });
	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, error: "Server error" });
	}
}

module.exports = { myInfoController };