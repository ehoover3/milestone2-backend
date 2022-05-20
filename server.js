// 1a. dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// 1b. configurations
require("dotenv").config();
const app = express();

// 1c. variables
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("Connected to mongoDB at", MONGO_URI);
});

// 2. middleware
app.use(cors()); // prevent cors errors
app.use(express.urlencoded({ extended: true })); // parse incoming requests
app.use(express.json()); // parse incoming requests with JSON payloads

// 3. routes & controllers
// employee controller
const employeeController = require("./controllers/employee.js");
app.use("/employee", employeeController);

// 404 error
app.get("*", (req, res) => {
  res.json("error404");
});

// 4. listen for connections
app.listen(PORT, () => {
  console.log("Listening at port", PORT);
});
