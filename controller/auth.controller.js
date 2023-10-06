const jwt = require("jsonwebtoken");
require("dotenv").config();
const authController = {};

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

authController.authenticate = (req, res, next) => {
  console.log("sdfsf");
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString) {
      throw new Error("invaild token");
    }
    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
      if (error) throw new Error("invaild token");
      req.body.userId = payload._id;
    });
    next();
  } catch (error) {
    res.status(400).json({ status: "fail", error: error });
  }
};

module.exports = authController;
