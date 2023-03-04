const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')
const mongoString = process.env.DATABASE_URL;
const app = express();

//==============================//
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//================================//
//khai báo controller
const accounts = require("./src/routes/account.js");
const feedback = require("./src/routes/feedback");

//Router
app.use("/account", accounts);
app.use("/feedback", feedback);

//=================================//
mongoose.set ('strictQuery', true);//trang thái true sẽ tắt cảnh báo trên mongoos 6
//Connect Database
mongoose.connect(mongoString);
const database = mongoose.connection;
database.once("connected", () => {
  console.log("Database Connected");
});
//error sẽ được gọi khi gặp error.
database.on("error", (error) => {
  console.log(error);
});

//==================================//
const port = process.env.PORT || process.env.APP_PORT;
app.listen(port, () => {
  console.log("Server up and running on PORT: ", port);
});
