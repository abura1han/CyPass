const { validationResult } = require('express-validator');
const { Business_profile } = require('../models');
const { validationCheck } = require('../utils/validationCheck');



/*
// Get business profile info
*/
const getBusinessProfileController = async (req, res) => {
	try {
		// Get business profile data with userid
		const profile = await Business_profile.findByPk(req.User.id, { raw: true });
		if (!profile) {
			return res.status(500).json({ success: false, error: "Error occurred while feching business profile info" });
		}

		res.status(200).json({ success: true, data: profile });

	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, error: "Server error" });
	}
}


/*
// Create business profile controller
*/
const createBusinessProfileController = async (req, res) => {
	const {
		Name,
		Cover_photo,
		Logo,
		Embed_video,
		Description,
		Attributes,
		Amenities,
		Safety_and_cleanlines,
		Howto_get_there,
		Howto_prepare,
		Closed_dates,
		Phone,
		Facebook,
		Instagram,
		Twitter,
		Yelp
	} = req.body;

	try {
		// Validation check
		const isValid = validationCheck(validationResult(req));
		if (isValid) {
			return res.status(400).json({ success: false, error: isValid });
		}

		// If business profile exist
		const business_profile = await Business_profile.findByPk(req.User.id, { raw: true });
		if (business_profile) {
			return res.status(400).json({ success: false, error: "Business profile already exist" });
		}

		// Create business profile
		const profile = await Business_profile.create({
			id: req.User.id,
			Name,
			Cover_photo: Cover_photo ? Cover_photo : null,
			Logo: Logo ? Logo : null,
			Embed_video: Embed_video ? Embed_video : null,
			Description,
			Attributes: Attributes ? Attributes : null,
			Amenities: Amenities ? Amenities : null,
			Safety_and_cleanlines: Safety_and_cleanlines ? Safety_and_cleanlines : null,
			Howto_get_there: Howto_get_there ? Howto_get_there : null,
			Howto_prepare: Howto_prepare ? Howto_prepare : null,
			Closed_dates: Closed_dates ? Closed_dates : null,
			Phone: Phone ? Phone : null,
			Facebook: Facebook ? Facebook : null,
			Instagram: Instagram ? Instagram : null,
			Twitter: Twitter ? Twitter : null,
			Yelp: Yelp ? Yelp : null,
			UserId: req.User.id,
		});
		// If profile creation failed
		if (!profile) {
			return res.status(500).json({ success: false, error: "Error occurred while creating business profile" });
		}

		res.status(200).json({ success: true, message: "Business profile creation successful" });

	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, error: "Server error" })
	}
}


/*
// Update business profile controller
*/
const updateBusinessProfileControler = async (req, res) => {
	try {
		// Update profile
		const profile = await Business_profile.update(req.body, { where: { id: req.User.id } });
		if (!profile) {
			return res.status(500).json({ success: false, error: "Error occurred while updating profile" });
		}

		res.status(200).json({ success: true, message: "Profile update successful" })
	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, error: "Server error" });
	}
}

module.exports = { getBusinessProfileController, createBusinessProfileController, updateBusinessProfileControler };