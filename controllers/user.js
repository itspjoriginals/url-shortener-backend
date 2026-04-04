const User = require('../models/user');
const uuidv4 = require('uuid').v4;
const {setUser} = require('../service/auth')

const handleUserSignup = async(req, res) => {
  try {
    const {name, email, password} = req.body;
    await User.create({
      name,
      email,
      password,
    });

    return res.render("home");
  
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const handleUserLogin = async(req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({
      email,
      password,
    });

    if(!user)
      return res.render("login", {
        error: "Invalid Username or Password",
      });

      const sessionId = uuidv4();
      setUser(sessionId, user);
      res.cookie("uid", sessionId);
    return res.redirect("/");
  
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


module.exports = {
  handleUserSignup,
  handleUserLogin
}