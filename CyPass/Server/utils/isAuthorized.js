require('dotenv').config();

const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Token check middleware
const isAuthorized = async (req, res, next) => {
	const { authorization } = req.headers;
	try {
		// If authorization token not provided
		if (!authorization) {
			return res.status(401).json({ success: false, error: "Unauthorized access blocked" });
		}

		const token = authorization.split(' ');
		if (!token.length > 0) {
			return res.status(401).json({ success: false, error: "Unauthorized access blocked" });
		}

		// Verify access token
		const { UserId } = await jwt.verify(token[1], process.env.AUTH_SECRET_KEY);

		// Find the user wit decoded id
		const user = await User.findOne({ where: { id: UserId }, raw: true, attributes: { exclude: ['Password'] } });
		if (!user) {
			return res.status(400).json({ success: false, error: "Invalid token" });
		}

		// Bind user to req
		req.User = user;

		next();

	} catch (err) {
		// If token expired
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

module.exports = isAuthorized;