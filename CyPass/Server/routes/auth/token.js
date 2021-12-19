require('dotenv').config();

const jwt = require('jsonwebtoken');
const { Token } = require('../../models');

/*
// Refresh token controller
*/
const tokenController = async (req, res) => {
	try {
		if (!req.body.Token) {
			return res.status(403).json({ success: false, error: "Refresh token is required" });
		}

		// validate refresh token
		const { UserId } = await jwt.verify(req.body.Token, process.env.REFRESH_TOKEN_SECRET_KEY);

		// If token does not exist
		const isTokenExist = await Token.findOne({ where: { id: UserId, Token: req.body.Token } });
		if (!isTokenExist) {
			return res.status(400).json({ success: false, error: "Invalid refresh token" })
		}

		// Generate new access token
		const access_token = await jwt.sign({
			sub: 'part',
			aud: process.env.HOME_URL,
			UserId,

		}, process.env.AUTH_SECRET_KEY, { expiresIn: '45m' });

		res.status(200).json({ success: true, access_token });
	} catch (err) {
		if (err.name === 'TokenExpiredError') {
			return res.status(403).json({ success: false, error: "Token expired" })
		}

		if (err.name === 'JsonWebTokenError') {
			return res.status(403).json({ success: false, error: "Invalid token" })
		}

		console.log(err);
		res.status(500).json({ success: false, error: 'Server error' })
	}
}

module.exports = tokenController;