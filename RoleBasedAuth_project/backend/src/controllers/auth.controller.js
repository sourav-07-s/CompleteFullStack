const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const isProduction =
  process.env.NODE_ENV === "production" ||
  process.env.VERCEL === "1";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

function createToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
  }

  return jwt.sign(
    {
      id: user._id.toString(),
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

function publicUser(user) {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
}

async function registerUser(req, res) {
  const { username, email, password } = req.body || {};

  if (
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    !username.trim() ||
    !email.trim() ||
    !password
  ) {
    return res.status(400).json({
      message: "Username, email and password are required",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      message: "Password must contain at least 8 characters",
    });
  }

  const cleanUsername = username.trim();
  const cleanEmail = email.trim().toLowerCase();

  const existingUser = await userModel.findOne({
    $or: [{ username: cleanUsername }, { email: cleanEmail }],
  });

  if (existingUser) {
    return res.status(409).json({
      message: "Username or email already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let user;
  try {
    // Never accept an admin role from public registration.
    user = await userModel.create({
      username: cleanUsername,
      email: cleanEmail,
      password: hashedPassword,
      role: "user",
    });
  } catch (error) {
    // Two people registering the same username/email at the same moment
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Username or email already exists",
      });
    }
    throw error;
  }

  const token = createToken(user);

  res.cookie("token", token, cookieOptions);

  return res.status(201).json({
    message: "User registered successfully",
    user: publicUser(user),
  });
}

async function loginUser(req, res) {
  const { username, email, password } = req.body || {};

  const identifier = String(username || email || "").trim();

  if (!identifier || typeof password !== "string" || !password) {
    return res.status(400).json({
      message: "Username/email and password are required",
    });
  }

  const user = await userModel.findOne({
    $or: [{ username: identifier }, { email: identifier.toLowerCase() }],
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const passwordValid = await bcrypt.compare(password, user.password);

  if (!passwordValid) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = createToken(user);

  res.cookie("token", token, cookieOptions);

  return res.status(200).json({
    message: "User login successful",
    user: publicUser(user),
  });
}

async function logoutUser(req, res) {
  res.clearCookie("token", cookieOptions);

  return res.status(200).json({
    message: "User logout successful",
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};