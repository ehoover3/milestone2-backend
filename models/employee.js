// Import Mongoose
const mongoose = require("mongoose");

// Schema Constructor
const { Schema } = mongoose;

// Schema
const employeeSchema = new Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  team: { type: String, required: true },
  salary: { type: String, required: true },
});

// HELPER METHODS
// employeeSchema.methods.getBakedBy = function () {
//   return `${this.name} was baked with love by ${
//     this.baker.name
//   }, who has been with us since ${this.baker.startDate.getFullYear()}`;
// };

// Model
const Employee = mongoose.model("Employee", employeeSchema);

// Exports
module.exports = Employee;
