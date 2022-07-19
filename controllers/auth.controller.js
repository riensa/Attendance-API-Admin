const jwt = require("jsonwebtoken");
const DB = require("../models");
const bcrypt = require("bcrypt");

const AdminsDB = DB.admins;
const Op = DB.Sequelize.Op;


exports.login = async (req, res) => {
	try {

		// find username
		let admin = await AdminsDB.findOne({
			where: {username: req.body.username}
		})

		// compare password
		let isValidPassword = false
		if(admin) {
			isValidPassword = bcrypt.compareSync(
				req.body.password,
				admin.password
			);
		} 

		// return error if invalid username or password
		if (!admin || !isValidPassword) {
			return res.status(400).send({
				status: 400,
				success: false,
				message: 'Validation Error',
				errors: [{
					"value": req.body.username,
					"msg": "Invalid username or password",
					"param": "username",
					"location": "body"
				}]
			});
		}

		//signing token with user id
		var token = jwt.sign({
			id: admin.id
		}, process.env.API_SECRET, {
			expiresIn: 86400
		});
		
		return res.send({
			status: 200,
			success: true,
			message: 'Login Successfull',
			data: {
				admin: {
					username: admin.username,
					fullname: admin.fullname
				},
				accessToken: token
			}
		})
	} catch (error) {
		return res.status(500).send({
			status: 500,
			success: false,
			message: "Unexpected Error",
			errors: error.message || "Some error occurred"
		});
	}
}