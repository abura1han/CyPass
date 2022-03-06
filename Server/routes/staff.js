const { validationResult } = require("express-validator");
const { Staff } = require("../models");
const { validationCheck } = require("../utils/validationCheck");


/*
// Get all staffs
*/
const getAllStaff = async (req, res) => {
	try {
		const staffs = await Staff.findAll({ where: { BusinessProfileId: req.User.id } });
		res.status(200).json({ success: true, staffs });
	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, error: "Server error" })
	}
}

/*
// Get single staff by staff id
*/
const getSingleStaff = async (req, res) => {
	try {
		// If staff id is empty
		if (!req.params.id) {
			return res.status(400).json({ success: false, error: "Staff id can\'t be empty" });
		}
		const staff = await Staff.findByPk(req.params.id, { raw: true });
		if (!staff) {
			return res.status(400).json({ success: false, error: "Invalid staff id" });
		}

		res.status(200).json({ success: true, staff });
	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, error: "Server error" })
	}
}


/*
// Create new staff
*/
const createStaff = async (req, res) => {
	const {
		Avatar,
		Name,
		Email,
		Phone,
		Bio,
		Certification,
		Class_location,
		Previllage
	} = req.body;

	try {
		// Validation check
		const isValid = validationCheck(validationResult(req));
		if (isValid) {
			return res.status(400).json({ success: false, error: isValid });
		}

		// Create staff
		const staff = await Staff.create({
			Avatar: Avatar ? Avatar : null,
			Name,
			Email,
			Phone: Phone ? Phone : null,
			Bio: Bio ? Bio : null,
			Certification: Certification ? Certification : null,
			Class_location: Class_location ? Class_location : null,
			Previllage: Previllage ? Previllage : "Trainer",
			BusinessProfileId: req.User.id,
		})

		res.status(200).json({ success: true, message: "Staff added", data: staff });

	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, error: "Server error" });
	}
}

/*
// Update staff
*/
const updateStaff = async (req, res) => {
	try {
		// If staff id is empty
		if (!req.params.id) {
			return res.status(400).json({ success: false, error: "Can\'t update staff with empty staff id" });
		}

		// If staff does not exist
		const staff = await Staff.findOne({ where: { id: req.params.id, BusinessProfileId: req.User.id } });
		if (!staff) {
			return res.status(400).json({ success: false, error: "Invalid staff id" });
		}

		// Update staff
		await Staff.update(req.body, { where: { id: req.params.id } });

		res.status(200).json({ success: true, message: "Staff update successful" });
	} catch (err) {
		console.log(err);
	}
}


/*
// Delete staff
*/
const deleteStaff = async (req, res) => {
	try {
		// If staff id is empty
		if (!req.params.id) {
			return res.status(400).json({ success: false, error: "Can\'t delete staff with empty staff id" });
		}

		// If staff does not exist
		const staff = await Staff.findOne({ where: { id: req.params.id, BusinessProfileId: req.User.id } });
		if (!staff) {
			return res.status(400).json({ success: false, error: "Invalid staff id" });
		}

		await Staff.destroy({ where: { id: req.params.id } });

		res.status(200).json({ success: true, message: "Staff delete successful" });
	} catch (err) {
		console.log(err);
	}
}


module.exports = { getAllStaff, getSingleStaff, createStaff, updateStaff, deleteStaff };
