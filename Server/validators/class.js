const { body } = require('express-validator');

//  Create class validation
const createClassValidator = [
	body('Name').not().isEmpty().withMessage("Name is required"),
	body('Description').not().isEmpty().withMessage("Description is required"),
]

module.exports = { createClassValidator };