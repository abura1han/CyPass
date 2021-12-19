module.exports = (sequelize, DataTypes) => {
	const Campaings = sequelize.define("Campaings", {
		Campaings: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Start_date: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		End_date: {
			type: DataTypes.STRING,
		},

	})

	Campaings.associate = models => {
		Campaings.belongsTo(models.Business_profile, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		});
	}

	return Campaings;
}