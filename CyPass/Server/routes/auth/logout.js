const { Token } = require('../../models');

const logoutController = async (req, res) => {
	try {
		// Delete the access token from db
		await Token.destroy({ where: { id: req.User.id } });
		res.status(200).json({ success: true, message: "Logged out successful" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, error: "Server error" });
	}
}

module.exports = { logoutController };