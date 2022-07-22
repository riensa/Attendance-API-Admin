const DB = require("../models");
const bcrypt = require("bcrypt");

const AdminsDB = DB.admins;
const Op = DB.Sequelize.Op;

exports.findAll = async (req, res) => {
	try {
		// fetch all data
		let AdminList =  await AdminsDB.findAll()

		return res.send({
			status: 200,
			success: true,
			message: "Fetch All Admin Successfully",
			data: AdminList
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

exports.findOne = async (req, res) => {
	try {
		const id = req.params.id;

		let DetailAdmin = await AdminsDB.findOne({ 
      where: { id: id }
    })

		if(DetailAdmin) {
			return res.send({
				status: 200,
				success: true,
				message: "Fetch Detail Admin Successfully",
				data: DetailAdmin
			})
		} 

		return res.status(400).send({
			status: 400,
			success: false,
			message: "Validation Error",
			errors: [{
				"value": id,
				"msg": "Admin not found",
				"param": "id",
				"location": "body"
			}]
		});
		
	} catch (error) {
		return res.status(500).send({
			status: 500,
			success: false,
			message: "Unexpected Error",
			errors: error.message || "Some error occurred"
		});
	}
}

exports.create = async (req, res) => {
	try {

		// check if username is unique
		let isUnique =  await AdminsDB.findOne({
			where: {username: req.body.username}
		})

		if(isUnique) {
			return res.status(400).send({
				status: 400,
				success: false,
				message: "Validation Error",
				errors: [{
					"value": req.body.username,
					"msg": "Username already taken",
					"param": "username",
					"location": "body"
        }]
			});
		} 

		const NewAdmin = await AdminsDB.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
      fullname: req.body.fullname
    })

		return res.send({
			status: 200,
			success: true,
			message: "New Admin Created!",
			data: {
				username: NewAdmin.username,
				fullname: NewAdmin.fullname
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

exports.update = async (req, res) => {
	try {

		// check if username is unique
		let isUnique =  await AdminsDB.findOne({
			where: {
				id: {
					[Op.ne]: req.body.id
				},
				username: req.body.username
			}
		})

		if(isUnique) {
			return res.status(400).send({
				status: 400,
				success: false,
				message: "Validation Error",
				errors: [{
					"value": req.body.username,
					"msg": "Username already taken",
					"param": "username",
					"location": "body"
        }]
			});
		} 

		let values = {
			username: req.body.username,
			fullname: req.body.fullname,
			status: req.body.status
		}

		if(req.body.password.length > 0) {
			values.password = bcrypt.hashSync(req.body.password, 8)
		}

		const admin = await AdminsDB.update(values, {
      where: { id: req.body.id }
    })

		if(admin == 1) {
			return res.send({
				status: 200,
				success: true,
				message: "Updated Successfully!",
				data: {
					username: req.body.username,
					fullname: req.body.fullname,
					status: req.body.status
				}
			})
		} else {
			return res.status(400).send({
				status: 400,
				success: false,
				message: "Validation Error",
				errors: [{
					"value": req.body.id,
					"msg": "Admin not found",
					"param": "username",
					"location": "body"
        }]
			});
		}
	} catch (error) {
		return res.status(500).send({
			status: 500,
			success: false,
			message: "Unexpected Error",
			errors: error.message || "Some error occurred"
		});
	}
}
