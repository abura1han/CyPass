const { validationResult } = require("express-validator");
const { Class, Schedule } = require("../models");
const { validationCheck } = require("../utils/validationCheck");


/*
// Get scheduled classes
*/
const getAllScheduleController = async (req, res) => {
	try {
		const scheduled_items = await Schedule.findAll({ where: { BusinessProfileId: req.User.id } });
		res.status(200).json({ success: false, scheduled_items })
	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, error: "Server error" });
	}
}


/*
// Get single schedule by id
*/
const getSingleScheduleController = async (req, res) => {
	try {
		if (!req.params.id) {
			return res.status(400).json({ success: false, error: "Can\'t fetching data wiht empty schedule id" });
		}
		const scheduled_item = await Schedule.findByPk(req.params.id);
		if (!scheduled_item) {
			return res.status(400).json({ success: false, error: "Invalid schedule id" });
		}
		res.status(200).json({ success: false, scheduled_item })
	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, error: "Server error" });
	}
}


/*
// Create schedule
*/
const createScheduleController = async (req, res) => {
	const {
		Class_type,
		Class_id,
		Staff,
		Start_date,
		End_date,
		Start_time,
		Capacity,
		Duration,
		Repeat_on
	} = req.body;

	try {
		// Validation check
		const isValid = validationCheck(validationResult(req));
		if (isValid) {
			return res.status(400).json({ success: false, error: isValid });
		}

		// If any class does not exist
		const isExist = await Class.findByPk(Class_id, { raw: true });
		if (!isExist) {
			return res.status(400).json({ success: false, error: "Invalid class id" });
		}

		// Create schedule
		const schedule = await Schedule.create({
			Class_type,
			Staff,
			Start_date,
			End_date,
			Start_time,
			Capacity,
			Duration,
			Repeat_on,
			BusinessProfileId: req.User.id,
			ClassId: Class_id,
		});

		res.status(200).json({ success: true, message: "Schedule creation successful", schedule });

	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, error: "Server error" });
	}
}


/*
// Update schedule
*/
const updateScheduleController = async (req, res) => {
	try {
		// If req.params.id is empty
		if (!req.params.id) {
			return res.status(400).json({ success: false, error: "Can\'t update schedule with empty schedule id" });
		}

		// If no schedule record found with user provided schedule id
		const isScheduleExist = await Schedule.findByPk(req.params.id);
		if (!isScheduleExist) {
			return res.status(400).json({ success: false, error: "Invalid schedule id" });
		}

		await Schedule.update(req.body, { where: { BusinessProfileId: req.User.id, id: req.params.id } });
		res.status(200).json({ success: true, message: "Schedule update successful" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, error: "Server error" });
	}
}

/*
// Delete schedule
*/
const deleteScheduleController = async (req, res) => {
	try {
		// If req.params.id is empty
		if (!req.params.id) {
			return res.status(400).json({ success: false, error: "Can\'t delete schedule with empty schedule id" });
		}

		// If no schedule record found with user provided schedule id
		const isScheduleExist = await Schedule.findByPk(req.params.id);
		if (!isScheduleExist) {
			return res.status(400).json({ success: false, error: "Invalid schedule id" });
		}

		// Delete schedule
		await Schedule.destroy({ where: { BusinessProfileId: req.User.id, id: req.params.id } });

		res.status(200).json({ success: true, message: "Schedule deletion successful" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, error: "Server error" });
	}
}


module.exports = { getAllScheduleController, getSingleScheduleController, createScheduleController, updateScheduleController, deleteScheduleController };