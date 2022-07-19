const DB = require("../models");

const AdminsDB = DB.admins;
const Op = DB.Sequelize.Op;


exports.login = async (req, res) => {
	try {
		var admins = await AdminsDB.findAll()
		res.send(admins);
	} catch (error) {
		res.status(500).send({
			message: error.message || "Some error occurred while retrieving admins."
		});
	}
}