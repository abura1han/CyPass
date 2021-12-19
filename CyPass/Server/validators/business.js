const { body } = require('express-validator');

// Create business profile validation
const createBusinessProfileValidator = [
	body('Name').not().isEmpty().withMessage('Name is required'),

	body('Description').not().isEmpty().withMessage('Description is required'),
];

module.exports = { createBusinessProfileValidator };