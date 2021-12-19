const { validationResult } = require('express-validator');
const { Business_profile, Class } = require('../models');
const { validationCheck } = require('../utils/validationCheck');



/*
// Get classes
*/
const getClassesController = async (req, res) => {
	try {
		// Find all classes with User id
		const classes = await Class.findAll({ where: { BusinessProfileId: req.User.id } });
		res.status(200).json({ success: true, classes });
	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, error: "Server error" });
	}
}


/*
// Get class by class id
*/
const getSingleClassController = async (req, res) => {
	try {
		// If class id is not provided
		if (!req.params.id) {
			return res.status(400).json({ success: false, error: "Invalid class id" });
		}
		// Find all classes with User id
		const singleClass = await Class.findOne({ where: { BusinessProfileId: req.User.id, id: req.params.id } });
		if (!singleClass) {
			return res.status(400).json({ success: false, error: "Invalid class id" });
		}
		res.status(200).json({ success: false, class: singleClass });
	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, error: "Server error" });
	}
}


/*
// Create class
*/
const createClassController = async (req, res) => {
	const { Name, Description } = req.body;
	try {
		// Validation check
		const isValid = validationCheck(validationResult(req));
		if (isValid) {
			return res.status(400).json({ success: false, error: isValid });
		}

		// If business profile does not exist
		const businessProfile = await Business_profile.findByPk(req.User.id);
		if (!businessProfile) {
			return res.status(400).json({ success: false, error: "You don\'t have business profile yet" })
		}

		// Create the class
		const createClass = await Class.create({
			Name,
			Description,
			BusinessProfileId: req.User.id,
		})

		res.status(200).json({ success: true, data: createClass });
	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, error: "Server error" })
	}
}


/*
// Update class
*/
const updateClassController = async (req, res) => {
	try {
		// If req.query.id is empty
		if (!req.query.id) {
			return res.status(400).json({ success: false, error: "Can\'t update class with empty class id" });
		}

		// Update the class with class id
		const updateClass = await Class.update(req.body, {
			where: { BusinessProfileId: req.User.id, id: req.query.id },
			returning: true,
			plain: true
		})
		if (!updateClass) {
			return res.status(400).json({ success: false, error: "Invalid class id" });
		}

		res.status(200).json({ success: true, message: "Class update successful", class: updateClass });
	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, error: "Server error" })
	}
}

module.exports = { getClassesController, getSingleClassController, createClassController, updateClassController };