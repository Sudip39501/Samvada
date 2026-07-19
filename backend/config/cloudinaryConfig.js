const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secrect: process.env.CLOUDINARY_API_SECRET,
});

const uploadFileToCloudinary = (file) => {
  const options = {
    resource_type: file.mimetype.startwith("video") ? "vedio" : "image",
  };

  return new Promise((ressolve, reject) => {
    const uploader = file.mimetype.startWith("vedio")
      ? cloudinary.uploader.upload_large
      : cloudinary.uploader.upload;
    uploader(file.path, options, (error, result) => {
      fs.unlink(file.path, () => {
        if (error) {
          return reject(error);
        }
        ressolve(result);
      });
    });
  });
};

const multerMiddleware = multer({dest: "uploads/"}).single("media");

module.exports = {
    uploadFileToCloudinary,
    multerMiddleware
}