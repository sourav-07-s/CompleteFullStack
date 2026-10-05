const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  const { username, email, password, role = "user" } = req.body;

  const isuseralreadyExist = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (isuseralreadyExist) {
    return res.status(409).json({
      message: " user already exists ",
    });
  }

  try {
  } catch (error) {}

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
    role,
  });

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: " user registerd sucessfully",
    user: {
      id: user._id,
      username: user.username,
      emial: user.email,
      role: user.role,
    },
  });
}
module.exports = { registerUser };
