require('dotenv').config();

const { User, Token } = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


/*
// Login controller
*/
const loginController = async (req, res) => {
	const { Email, Password } = req.body;
	try {
		// Find user with Email is exist
		const user = await User.findOne({ where: { Email } });
		if (!user) {
			return res.status(400).json({ success: false, error: 'Invalid Email or Password' });
		}

		// Check password
		const isValid = await bcrypt.compare(Password, user.Password);
		if (!isValid) {
			return res.status(400).json({ success: false, error: 'Invalid Email or Password' });
		}

		// Generate user access token
		const access_token = await jwt.sign({
			sub: 'part',
			aud: process.env.HOME_URL,
			UserId: user.id,

		}, process.env.AUTH_SECRET_KEY, { expiresIn: '45m' });

		// Generate user refresh token
		const refresh_token = await jwt.sign({
			sub: 'ref',
			aud: process.env.HOME_URL,
			UserId: user.id,

		}, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '1y' });

		// Check if refresh token already exist
		const isTokentExist = await Token.findByPk(user.id, { raw: true });
		if (isTokentExist) {
			await Token.update({ Token: refresh_token }, { where: { id: user.id } });
		} else {
			// Store refresh token to db
			await Token.create({
				id: user.id,
				Token: refresh_token,
				UserId: user.id,
			})
		}

		res.status(200).json({ success: true, access_token, refresh_token });
	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, error: "Server error" });
	}
}

module.exports = loginController;