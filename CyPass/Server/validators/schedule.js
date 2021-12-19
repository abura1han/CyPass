const { body } = require('express-validator');

/*
// Create schedule
*/
const createScheduleValidator = [
	body('Class_type').not().isEmpty().withMessage('Class_type is required'),
	body('Class_id').not().isEmpty().withMessage('Class_id is required'),
	body('Start_date').not().isEmpty().withMessage('Start_date is required'),
	body('Start_time').not().isEmpty().withMessage('Start_time is required'),
	body('Duration').not().isEmpty().withMessage('Duration is required'),
	body('Repeat_on').not().isEmpty().withMessage('Repeat_on is required'),
]

module.exports = { createScheduleValidator };