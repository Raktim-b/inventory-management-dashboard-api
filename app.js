require("dotenv").config();
const express = require("express");
const Dbcon = require("./app/config/db");
const cors = require("cors");
const routes = require("./app/routes");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

Dbcon();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRECT,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //24hrs
    },
  }),
);
app.get("/", (req, res) => {
  res.redirect("/auth/login");
});

app.use((req, res, next) => {
  res.locals.search = "";
  next();
});

app.use("/", routes);

app.use(express.static("public"));
app.use("/upload", express.static("upload"));

const PORT = process.env.PORT || 4005;

app.listen(PORT, () => {
  console.log(`Server created at ${PORT}`);
});
