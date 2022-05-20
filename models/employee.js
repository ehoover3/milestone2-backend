// Import Mongoose
const mongoose = require("mongoose");

// Schema Constructor
const { Schema } = mongoose;

// Schema
const employeeSchema = new Schema({
  name: { type: String, required: true },
  position: { type: String },
  team: { type: String },
  salary: { type: String },
});

// Model
const Employee = mongoose.model("Employee", employeeSchema);

// Exports
module.exports = Employee;
