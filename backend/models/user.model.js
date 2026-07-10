const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phoneNumber: {
      // unique: true → All indexed values must be unique.
      // sparse: true → Only documents that contain the field are indexed.
      type: String,
      unique: true,
      sparse: true,
    },
    phoneSuffix: {
      type: String,
      unique: false,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
      emailOtp: { type: String },
      emailOtpExp: { type: Date },
      profilePic: { type: String },
      about: { type: String },
      lastseen: { type: date },
      isOnline: { type: Boolean, default: false },
      isVerified: { type: Boolean, default: false },
      agree: { type: Boolean, default: false },
    },
  },
  { timeStamps: true },
);

module.exports = mongoose.model("User", userSchema);
