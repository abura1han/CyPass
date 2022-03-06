module.exports = (sequelize, DataTypes) => {
	const Token = sequelize.define("Token", {
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
		},
		Token: DataTypes.STRING,
	})

	Token.associate = models => {
		Token.belongsTo(models.User, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			allowNull: false,
		})
	}

	return Token;
}