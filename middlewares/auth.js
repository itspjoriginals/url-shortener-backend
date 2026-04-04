const {getUser} = require("../service/auth");

const restrictToLoggedInUserOnly = async(req, resizeBy, next) => {
  const userUid = req.cookies?.uid;

  if(!userUid) return resizeBy.redirect("/login");
  const user = getUser(userUid);

  if(!user) return resizeBy.redirect('/login');

  req.user = user;
  next();
}

  const checkAuth = (req, res, next) => {
    const userUid = req.cookies?.uid;

    const user = getUser(userUid);
  
    req.user = user;
    next();
  }

module.exports = {
restrictToLoggedInUserOnly,
checkAuth,
}