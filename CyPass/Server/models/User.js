require('dotenv').config();

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
		},
		Avatar: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: `${process.env.HOME_URL}/images/default-user-avatar.png`,
		},
		Name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	})

	User.associate = models => {
		// Business profile
		User.hasOne(models.Business_profile, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			allowNull: false,
		});
	}

	return User;
}