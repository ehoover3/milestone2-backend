const express = require("express");
const employee = express.Router();
const Employee = require("../models/employee.js");

// READ
employee.get("/", async (req, res) => {
  const myEmployees = await Employee.find();
  res.json(myEmployees);
});

// CREATE
employee.post("/", (req, res) => {
  Employee.create(req.body); // sends req.body to the model, which sends it to the database
});

// UPDATE
employee.put("/:id", (req, res) => {
  Employee.findByIdAndUpdate(req.params.id, req.body, (error, updatedDocument) => {
    if (error) console.log(error);
    else console.log("Updated: ", updatedDocument);
  });
});

// DELETE
employee.delete("/:id", (req, res) => {
  Employee.findByIdAndDelete(req.params.id, (error, deletedDocument) => {
    if (error) console.log(error);
    else console.log("Deleted: ", deletedDocument);
  });
});

// SEED DATA
employee.get("/data/seed", (req, res) => {
  Employee.insertMany([
    {
      name: "Count Dracula",
      position: "Accountant",
      team: "Accounting",
      salary: 42500,
    },
    {
      name: "Geordi Leforge",
      position: "Software Engineer Manager",
      team: "Technology",
      salary: 85000,
    },
  ]);
});

module.exports = employee;
