const jwt = require("jsonwebtoken");
const { User } = require("../model/userSchema");

const AuthMiddleWare = async (req, res,next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Unauthorized Access ! Please login first!");
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = decoded;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User Not Found!");
    }

    req.user = user;

    next();
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Unauthorized", error: error.message });
  }
};

module.exports = {
  AuthMiddleWare
}