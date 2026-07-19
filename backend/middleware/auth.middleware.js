const jwt = require("jsonwebtoken");
const responce = require("../utils/responceHandler");

const authMiddlware = (req, res, next) => {
  const authToken = req.cookies?.token;

  if (!authToken) {
    return responce(
      res,
      401,
      "authorrization token missing , please provide token",
    );
  }
  try {
    const decode = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = decode;
    // console.log(req. user);
    next();
  } catch (error) {
    console.log("Error Occur while decode token:",error);
    return responce(res, 401, "Invalid or expiredToken");
  }
};


module.exports = authMiddlware;
