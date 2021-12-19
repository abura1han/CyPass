module.exports = (sequelize, DataTypes) => {
	const Schedule = sequelize.define("Schedule", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
		},
		Class_type: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "Recurring",
		},
		Staff: {
			type: DataTypes.UUID,
		},
		Start_date: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		End_date: {
			type: DataTypes.STRING,
		},
		Start_time: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Capacity: {
			type: DataTypes.INTEGER,
		},
		Duration: {
			type: DataTypes.STRING,
			allowNull: false,

		},
		Repeat_on: {
			type: DataTypes.STRING,
		},

	});

	Schedule.associate = models => {
		Schedule.belongsTo(models.Class, {
			allowNull: false,
		});
	}

	return Schedule;
}