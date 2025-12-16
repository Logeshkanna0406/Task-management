const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("./generateToken"); // OR same file

// REGISTER
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  res.status(201).json({
    token: generateToken(user),
    role: user.role
  });
};

// LOGIN
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  res.json({
    token: generateToken(user),
    role: user.role
  });
};
