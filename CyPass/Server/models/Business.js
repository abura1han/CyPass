module.exports = (sequelize, DataTypes) => {
	const BusinessProfile = sequelize.define("Business_profile", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
		},
		Name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Cover_photo: {
			type: DataTypes.STRING,
		},
		Logo: {
			type: DataTypes.STRING,
		},
		Embed_video: {
			type: DataTypes.STRING,
		},
		Description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Attributes: {
			type: DataTypes.STRING,
		},
		Amenities: {
			type: DataTypes.STRING,
		},
		Safety_and_cleanlines: {
			type: DataTypes.STRING,
		},
		Howto_get_there: {
			type: DataTypes.STRING,
		},
		Howto_prepare: {
			type: DataTypes.STRING,
		},
		Phone: {
			type: DataTypes.STRING,
		},
		Facebook: {
			type: DataTypes.STRING,
		},
		Instagram: {
			type: DataTypes.STRING,
		},
		Twitter: {
			type: DataTypes.STRING,
		},
		Yelp: {
			type: DataTypes.STRING,
		},
		Closed_dates: {
			type: DataTypes.STRING,
		},

	});


	BusinessProfile.associate = models => {
		BusinessProfile.belongsTo(models.User, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		})

		BusinessProfile.hasMany(models.Schedule, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		});

		BusinessProfile.hasMany(models.Class, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		});

		BusinessProfile.hasMany(models.Staff, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		});
	}

	return BusinessProfile;
}