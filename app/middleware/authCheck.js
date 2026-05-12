const jwt = require("jsonwebtoken");

const AuthCheck = (req, res, next) => {
  try {
    if (!req.cookies || !req.cookies.token) {
      return res.redirect("/auth/login");
    }

    jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        return res.redirect("/auth/login");
      }

      req.user = data;

      next();
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = AuthCheck;
