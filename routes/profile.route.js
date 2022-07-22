require('express-group-routes');
const express = require('express');
const router = express.Router();
const ProfileController = require("../controllers/profile.controller.js");
const ProfileValidator = require('../middlewares/validators/profile.validator.js');
const VerifyToken = require('../middlewares/auth/jwt.auth.js');


// Retrieve all rooms from the database
router.use(VerifyToken)
router.get("/", ProfileValidator.validateSession, ProfileController.findAll);
router.get("/detail/:id", ProfileValidator.validateSession, ProfileController.findOne);
router.post("/", ProfileValidator.validateAdmin, ProfileController.create);
router.put("/", ProfileValidator.validateAdminUpdate, ProfileController.update);

module.exports = router;