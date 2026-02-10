const User = require("../model/Users.model");
const { hashPassword, comparePassword } = require("../helper/bcryptPassword");
const { generateToken } = require("../helper/jwt");

async function registerController(req, res) {
  try {
    const { email, password } = req.body;

    // 1️1 Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    // 2️ Check if user and number already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }
    // 3️ Hash the password
    const hashedPassword = await hashPassword(password);

    // 4️ Create and save user in DB
    const user = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
    });
    await user.save();

    // 5 Generate JWT token
    const token = generateToken({ userId: user._id, email: user.email });

    // 6 Send response
    res.status(200).json({
      message: "User signed up successfully",
      user: {
        email: user.email,
        userId: user._id
      },
      token: token
    });

  } catch (err) {
    console.error("Error in /register:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function loginController(req, res) {
  try {
    const { email, password } = req.body
    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(409).json({ error: "User not found" });
    }

    // 3️⃣ Compare password
    const isPasswordValid = await comparePassword(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // 4 Generate JWT token
    const token = generateToken({ userId: existingUser._id, email: existingUser.email });
    // 5️⃣ Send response
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        userId: existingUser._id,
        email: existingUser.email,
      },
      token: token
    });
  } catch (error) {
    res.status(500).json({
      error: "server error"
    })
  }
}

module.exports = { registerController, loginController };