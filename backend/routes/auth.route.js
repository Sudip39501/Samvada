const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddlware = require("../middleware/auth.middleware");
const { multerMiddleware } = require("../config/cloudinaryConfig");

const router = express.Router();

router.post("/send-otp",authController.sendOtp);
router.post("/verify-otp",authController.verifyOtp);

//protected route
router.put("/update-profile",authMiddlware,multerMiddleware,authController.updateProfile);

module.exports = router;