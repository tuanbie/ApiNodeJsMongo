const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const moment = require("moment")
const mongoString = process.env.DATABASE_URL;
const app = express();

//==============================//
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//================================//
//khai báo controller
const users = require("./src/routers/user.router.js");
const products = require("./src/routers/product.router.js");
const invoices = require("./src/routers/invoice.router");
const statistics = require("./src/routers/statistics.router");

//Router
app.use("/users", users);
app.use("/products", products);
app.use("/invoices", invoices);
app.use("/statistics", statistics);
//=================================//
mongoose.set("strictQuery", true); //trang thái true sẽ tắt cảnh báo trên mongoos 6
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
