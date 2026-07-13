const Otpgenerator = require("../utils/optGenerator");
const User = require("../models/user.model");
const responce = require("../utils/responceHandler");
const sendOtpToEmail = require("../services/emailService");
const twilloService = require("../services/twiloService");
const generateToken = require("../utils/generateToken");

//sent otp
const sendOtp = async (req, res) => {
  try {
    const { phoneNumber, phoneSuffix, email } = req.body;

    const otp = Otpgenerator();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    let user;

    if (email) {
      user = await User.findOne({ email });

      if (!user) {
        user = new User({ email });
      }
      
      user.emailOtp = otp;
      user.emailOtpExp = expiry;
      console.log(otp);
      console.log(expiry);

      console.log(user);
      await user.save();
      await sendOtpToEmail(email, otp);
      return responce(res, 200, "Otp sent to your email", email);
    }

    if (!phoneNumber && !phoneSuffix) {
      return responce(res, 400, "Phone number and phone suffix are required");
    }
    const fullPhoneNumber = `${phoneSuffix}${phoneNumber}`;

    user = await User.findOne({ phoneNumber });
    if (!user) {
      user = new User({ phoneNumber, phoneSuffix });
    }
    await twilloService.sendOtpToPhoneNumber(fullPhoneNumber);
    await user.save();

    return responce(res, 200, "Otp sent to your phone", user);
  } catch (error) {
    console.error("Error sending OTP:", error);
    return responce(res, 500, "Internal server error");
  }
};

//step -2 Verify OTP

const verifyOtp = async (req, res) => {
  const { phoneNumber, phoneSuffix, email, otp } = req.body;

  try {
    let user;
    if (email) {
      user = await User.findOne({ email });
      if (!user) {
        return responce(res, 404, "User not found");
      }

      const now = new Date();

      
      if (
        !user.emailOtp ||
        String(user.emailOtp) !== String(otp) ||
        now > new Date(user.emailOtpExp)
      ) {
        return responce(res, 400, "Invalid or expired OTP");
      }

      user.isVerified = true;
      user.emailOtp = null;
      user.emailOtpExp = null;
      await user.save();
    } else {
      if (!phoneNumber && !phoneSuffix) {
        return responce(res, 400, "Phone number and phone suffix are required");
      }
      const fullPhoneNumber = `${phoneSuffix}${phoneNumber}`;
      user = await User.findOne({ phoneNumber });
      if (!user) {
        return responce(res, 404, "User not found");
      }

      const result = await twilloService.verifyOtp(fullPhoneNumber, otp);
      if (result.status !== "approved") {
        return responce(res, 400, "Invalid or expired OTP");
      }

      user.isVerified = true;
      await user.save();
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return responce(res, 200, "OTP verified successfully", { user, token });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw new Error("Internal Server Error");
  }
};


module.exports = {
  sendOtp,
  verifyOtp,
};

