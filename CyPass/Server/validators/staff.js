const { body } = require('express-validator');

// Create staff validation
const createStaffValidator = [
	body('Name').not().isEmpty().withMessage('Name is required'),
	body('Email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
	// body('Class_location').not().isEmpty().withMessage('Class_location is required'),
	body('Previllage').not().isEmpty().withMessage('Previllage is required'),
]

module.exports = { createStaffValidator };