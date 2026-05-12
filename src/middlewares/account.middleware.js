const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function accountMiddleware(req, res, next) {
  const token =
    req.cookies.userToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Invalid User, Token not found",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId);
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid User, Incorrect token",
    });
  }
}

async function systemAccountMiddleware(req, res, next) {
  const token =
    req.cookies.userToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Invalid User, Token not found",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId).select("+systemUser");

    if (!user.systemUser) {
      return res.status(403).json({
        message: "Access denied, only system users can perform this action",
      });
    }

    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid User, Incorrect token",
    });
  }
}

module.exports = { accountMiddleware, systemAccountMiddleware };
