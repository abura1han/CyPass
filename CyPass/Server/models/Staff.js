require('dotenv').config();

module.exports = (sequelize, DataTypes) => {
	const Staff = sequelize.define("Staff", {
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		Avatar: {
			type: DataTypes.STRING,
			default: `${process.env.HOME_URL}/images/default-user-avatar.png`
		},
		Name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Phone: {
			type: DataTypes.STRING
		},
		Bio: {
			type: DataTypes.STRING,
		},
		Certification: {
			type: DataTypes.STRING,
		},
		Class_location: {
			type: DataTypes.STRING,
		},
		Previllage: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "Trainer",
		},
	})

	Staff.associate = models => {
		Staff.belongsTo(models.Business_profile, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		});
	}

	return Staff;
}