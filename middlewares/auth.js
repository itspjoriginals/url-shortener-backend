const {getUser} = require("../service/auth");

const checkForAuthentication = (req, res, next) => {
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if(!tokenCookie)

    return next();

    const token = tokenCookie;
    const user = getUser(token);

    req.user = user;
    return next();
}

const restrictTo = (roles = []) => {
  return (req, res, next) => {
    if(!req.user) return res.redirect('/login');

    if(!roles.includes(req.user.role)) return res.end("Unauthorized");

    return next();
  }
}

// const restrictToLoggedInUserOnly = async(req, resizeBy, next) => {
//   const userUid = req.cookies?.uid;

//   if(!userUid) return resizeBy.redirect("/login");
//   const user = getUser(userUid);

//   if(!user) return resizeBy.redirect('/login');

//   req.user = user;
//   next();
// }

//   const checkAuth = (req, res, next) => {
//     const userUid = req.cookies?.uid;

//     const user = getUser(userUid);
  
//     req.user = user;
//     next();
//   }

module.exports = {
checkForAuthentication,
restrictTo,
}