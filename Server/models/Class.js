module.exports = (sequelize, DataTypes) => {
	const Class = sequelize.define("Class", {
		Name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Location: {
			type: DataTypes.STRING,
		},
		Categories: {
			type: DataTypes.STRING,
		},
		Howto_prepare: {
			type: DataTypes.STRING,
		},
		Staff: {
			type: DataTypes.UUID,
		},
		Is_free: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
		Reservation: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
		Is_enabled: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		}
	})

	Class.associate = models => {
		Class.belongsTo(models.Business_profile, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		});

		Class.hasMany(models.Schedule, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		})
	}

	return Class;
}