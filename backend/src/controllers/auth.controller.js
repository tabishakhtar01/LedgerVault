const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const emailService = require("../services/email.service");

function setAuthCookie(res, token) {
  res.cookie("userToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

async function registerUser(req, res) {
  const { email, name, password } = req.body;

  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    return res.status(409).json({
      message: "User with this email already exist",
    });
  }

  const user = await userModel.create({
    email,
    name,
    password,
  });

  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
  );

  setAuthCookie(res, token);

  emailService.sendRegistrationEmail(user.email, user.name);

  return res.status(201).json({
    message: "New user created",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      userId: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  setAuthCookie(res, token);

  return res.status(200).json({
    message: "User logged In successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
}

module.exports = { registerUser, loginUser };
