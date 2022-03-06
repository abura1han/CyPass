const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { validationResult } = require('express-validator')
const { validationCheck } = require('../../utils/validationCheck');

/*
// Signup controller
*/
const signupController = async (req, res) => {
	const {
		Name,
		Email,
		Password,
		Address
	} = req.body;

	try {
		// Validation check
		const isValid = validationCheck(validationResult(req));
		if (isValid) {
			return res.status(400).json({ success: false, errors: isValid });
		}

		// hash the passowrd
		const hashedPassword = await bcrypt.hash(Password, 11);

		const account = await User.create({
			Name,
			Email,
			Password: hashedPassword,
			Address
		});

		// If account creation failed
		if (!account) {
			return res.status(500).json({ success: false, error: 'Signup failed' })
		}

		res.status(200).json({ success: true, message: 'Account creation successful.' })

	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, error: 'Server error' })
	}
}

module.exports = signupController;