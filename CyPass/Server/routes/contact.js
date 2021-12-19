const { Contact } = require('../models');


/*
// Create business profile contact
*/
const getAllContacts = async (req, res) => {
	try {
		const contacts = await Contact.findAll({ where: { BusinessProfileId: req.User.id } });
		res.status(200).json({ success: true, contacts });
	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, error: "Server error" });
	}
}


/*
// Create business profile contact
*/
const createContact = async (req, res) => {
	const {
		Phone,
		Facebook,
		Instagram,
		Twitter,
		Yelp,
		Website,
	} = req.body;
	try {
		// If contacts alredy exist
		const contact = await Contact.findByPk(req.User.id, { raw: true });
		if (contact) {
			return res.status(403).json({ success: false, error: "Contact already exist" });
		}

		// Create the contact
		await Contact.create({
			id: req.User.id,
			Phone: Phone ? Phone : null,
			Facebook: Facebook ? Facebook : null,
			Instagram: Instagram ? Instagram : null,
			Twitter: Twitter ? Twitter : null,
			Yelp: Yelp ? Yelp : null,
			Website: Website ? Website : null,
			BusinessProfileId: req.User.id,
		});

		res.status(200).json({ success: true, message: "Contact added" })
	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, error: "Server error" });
	}
}


/*
// Update business profile contact
*/
const updateContact = async (req, res) => {
	try {
		// If contacts not exist
		const contact = await Contact.findByPk(req.User.id, { raw: true });
		if (!contact) {
			return res.status(403).json({ success: false, error: "Contacts does not exist to update" });
		}
		await Contact.update(req.body, { where: { id: req.User.id } });

		res.status(200).json({ success: true, message: "Contact updated" })
	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, error: "Server error" });
	}
}


module.exports = { getAllContacts, createContact, updateContact };