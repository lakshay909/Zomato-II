const express = require('express');
const authController = require("../controllers/auth.controller")

const router = express.Router();

router.post("/user/register",authController.registerUser)
router.post("/user/login",authController.loginUser)
router.get("/user/logout",authController.logoutUser)

router.post("/foodPartner/register",authController.registerfoodPartner)
router.post("/foodPartner/login",authController.loginfoodPartner)
router.get("/foodPartner/logout",authController.logoutfoodPartner)

module.exports = router;