require('express-group-routes');
const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/auth.controller.js");


// Retrieve all rooms from the database
router.get("/login", AuthController.login);

module.exports = router;