const RegistrationModel = require("../model/registration.db");
const httpStatusCode = require("../util/httpStatusCode");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../util/sendEmail");
const emailVerificationModel = require("../model/otpModel");
class AuthController {
  async registrationPage(req, res) {
    res.render("registration", {
      title: "Registration",
    });
  }
  async registration(req, res) {
    try {
      const { name, email, phone, password, role } = req.body;
      if (!name || !email || !password || !phone) {
        // return res.status(httpStatusCode.BAD_REQUEST).json({
        //   success: false,
        //   message: "All fields are required",
        // });
        console.log("all fields are required");

        return res.redirect("/auth/registration");
      }
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

      if (!passwordRegex.test(password)) {
        // return res.status(httpStatusCode.BAD_REQUEST).json({
        //   success: false,
        //   message:
        //     "Password must contain at least one letter and one number and be at least 6 characters long",
        // });
        console.log(
          "Password must contain at least one letter and one number and be at least 6 characters long",
        );
        return res.redirect("/auth/registration");
      }
      const existUser = await RegistrationModel.findOne({ email });
      if (existUser) {
        // return res.status(httpStatusCode.BAD_REQUEST).json({
        //   success: false,
        //   message: "user already exist",
        // });
        alert("user already exist");
        return res.redirect("/auth/registration");
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const userData = new RegistrationModel({
        name,
        email,
        phone,
        password: hashPassword,
        role,
      });
      if (req.file) {
        userData.image = req.file.path;
        userData.public_id = req.file.filename;
      }
      const result = await userData.save();
      await sendEmail(req, result);
      if (result) {
        // return res.status(httpStatusCode.CREATED).json({
        //   success: true,
        //   message: "User Added successfully",
        //   data: result,
        // });
        console.log("user created successfully", result);
        return res.redirect("/auth/verifyPage");
      }
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async loginPage(req, res) {
    res.render("login", {
      title: "Login",
    });
  }
  async logIn(req, res) {
    try {
      const { email, password } = req.body;
      const checkUser = await RegistrationModel.findOne({ email });
      if (!checkUser) {
        // return res.render("login", {
        //   title: "Login",
        //   error: "Invalid user ",
        // });
        console.log("Invalid user");
        return res.redirect("/auth/login");
      }
      if (!checkUser.isVerified) {
        console.log("User not verified");
        return res.redirect("/auth/login");
      }
      const checkPassword = await bcrypt.compare(password, checkUser.password);
      if (!checkPassword) {
        // return res.render("login", {
        //   title: "Login",
        //   error: "Wrong password ",
        // });
        console.log("Wrong password");
        return res.redirect("/auth/login");
      } else {
        const token = jwt.sign(
          {
            id: checkUser._id,
            name: checkUser.name,
            email: checkUser.email,
            role: checkUser.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" },
        );
        if (token) {
          res.cookie("token", token);
          if (checkUser.role === "admin") {
            return res.redirect("/products");
          } else {
            return res.redirect("/userPage");
          }
        } else {
          return res.redirect("/auth/login");
          console.log("invalid credentials");
        }
      }
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async verifyPage(req, res) {
    res.render("verifyPage", {
      title: "Verify Page",
    });
  }

  async verify(req, res) {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        console.log("All fields are required");
        return res.redirect("/auth/verifyPage");
      }
      const existingUser = await RegistrationModel.findOne({ email });
      if (!existingUser) {
        console.log("Invalid credentials");
        return res.redirect("/auth/verifyPage");
      }
      if (existingUser.isVerified) {
        console.log("Email already verified");
        return res.redirect("/auth/login");
      }
      const emailVerification = await emailVerificationModel.findOne({
        userId: existingUser._id,
        otp,
      });
      if (!emailVerification) {
        if (!existingUser.isVerified) {
          await sendEmail(req, existingUser);
          console.log("Invalid OTP, new OTP sent to your email");
          return res.redirect("/auth/login");
        }
        console.log("Invalid OTP");
        return res.redirect("/auth/login");
      }
      const currentTime = new Date();
      const expirationTime = new Date(
        emailVerification.createdAt.getTime() + 15 * 60 * 1000,
      );
      if (currentTime > expirationTime) {
        // OTP expired, send new OTP
        await sendEmail(req, existingUser);
        console.log("OTP expired, new OTP sent to your email");
        return res.redirect("/auth/login");
      }
      existingUser.isVerified = true;
      await existingUser.save();
      await emailVerificationModel.deleteMany({ userId: existingUser._id });
      res.redirect("/auth/login");
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async logOut(req, res) {
    res.clearCookie("token");
    res.redirect("/auth/login");
  }
}
module.exports = new AuthController();
