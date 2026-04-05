const User = require('../models/user');
const { setUser } = require('../service/auth');

const handleUserSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    await User.create({ name, email, password });

    return res.redirect("/login");
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.render("login", {
        error: "Invalid credentials",
      });
    }

    const token = setUser(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });

    return res.redirect("/");
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { handleUserSignup, handleUserLogin };