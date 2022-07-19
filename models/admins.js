module.exports = (sequelize, Sequelize) => {
	const Admins = sequelize.define("admins", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			username: {
				allowNull: false,
				type: Sequelize.STRING
			},
			fullname: {
				allowNull: false,
				type: Sequelize.STRING
			},
			status: {
				type: Sequelize.ENUM,
				values: ['active', 'inactive'],
				defaultValue: 'active',
				allowNull: false
			}
	});
	return Admins;
};