const { body } = require('express-validator');
const { User } = require('../models');

// Signup validation
const signupValidator = [
	body('Name').not().isEmpty().withMessage('Name is required'),

	body('Email').not().isEmpty().withMessage('Email is required').custom(async email => {
		const isExist = await User.findOne({ where: { Email: email } });
		if (isExist) {
			throw new Error('User already exist with your given email');
		}

		return true;
	}),

	body('Password').not().isEmpty().withMessage('Password is required'),

	body('Address').not().isEmpty().withMessage('Address is required'),
]

module.exports = { signupValidator };