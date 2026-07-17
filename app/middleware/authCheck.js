const jwt = require("jsonwebtoken");

const AuthCheck = (req, res, next) => {
  try {
    if (!req.cookies || !req.cookies.accessToken) {
      return res.redirect("/auth/refresh-token");
    }
    jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.redirect("/auth/refresh-token");
        }
        return res.redirect("/auth/login");
      }
      req.user = data;
      console.log("Decoded JWT:", req.user);
      next();
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = AuthCheck;
