const { Campaings } = require('../models');


// Get campaings
const getCampaings = async (req, res) => {
	try {
		// Get campaings with business profile id
		campaings = await Campaings.findAll({ where: { BusinessProfileId: req.User.id } });

		res.status(200).json({ success: true, campaings });
	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, error: "Server error" });
	}
}


// Create campaings
const createCampaings = async (req, res) => {
	try {
		if (!req.body.Campaings) {
			return res.status(400).json({ success: false, error: "Compaings is required" });
		}
		if (!req.body.Start_date) {
			return res.status(400).json({ success: false, error: "Start_date is required" });
		}
		if (!req.body.End_date) {
			return res.status(400).json({ success: false, error: "End_date is required" });
		}

		// Create campaings
		const campaings = await Campaings.create({
			Campaings: req.body.Campaings,
			Start_date: req.body.Start_date,
			End_date: req.body.End_date,
			BusinessProfileId: req.User.id,
		});

		res.status(200).json({ success: true, campaings });

	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, error: "Server error" });
	}
}

module.exports = { getCampaings, createCampaings };