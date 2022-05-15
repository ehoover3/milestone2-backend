// 1. MODULES & GLOBALS
require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const cors = require("cors");
const app = express();
const Employee = require("./models/employee.js");

// 2. MIDDLEWARE
app.use(cors()); // prevent cors errors
app.use(express.urlencoded({ extended: true })); // parse incoming requests
app.use(express.json()); // parse incoming requests with JSON payloads

// 3. DATA
let myEmployees = [
  {
    Name: "Diana Soulcrusher",
    Position: "CEO",
    Team: "Executive",
    Salary: 100000,
  },
  {
    Name: "Count Dracula",
    Position: "Accountant",
    Team: "Accounting",
    Salary: 42500,
  },
  {
    Name: "Doctor Robotnik",
    Position: "Electrical Engineer Manager",
    Team: "Technology",
    Salary: 85000,
  },
  {
    Name: "Michaelangelo NinjaTurtle",
    Position: "Graphic Designer",
    Team: "Marketing",
    Salary: 35000,
  },
  {
    Name: "April O'Neil",
    Position: "Public Relations Manager",
    Team: "Marketing",
    Salary: 45000,
  },
  {
    Name: "Geordi Leforge",
    Position: "Software Engineer Manager",
    Team: "Technology",
    Salary: 85000,
  },
  {
    Name: "Mark Twain",
    Position: "Social Media Manager",
    Team: "Marketing",
    Salary: 30000,
  },
  {
    Name: "Duck Duckigans",
    Position: "Payroll Clerk",
    Team: "Accounting",
    Salary: 35000,
  },
];

// 4. ROUTES & CONTROLLERS
// READ
app.get("/", (req, res) => {
  res.json(myEmployees);
});

// CREATE
app.post("/employee", (req, res) => {
  console.log(req.body);
  console.log(req.body.name);
  console.log(req.body.position);
  console.log(req.body.team);
  console.log(req.body.salary);
  myEmployees = [
    ...myEmployees,
    {
      Name: req.body.name,
      Position: req.body.position,
      Team: req.body.team,
      Salary: req.body.salary,
    },
  ];
  res.json("post -> add new employee");
});

// UPDATE
app.put("/employee", (req, res) => {
  console.log(req.body);
  console.log(req.body.name);
  console.log(req.body.position);
  console.log(req.body.team);
  console.log(req.body.salary);
  res.json("put -> edit new employee");
});

// DELETE
app.delete("/employee/:id", (req, res) => {
  console.log(req.params);
  console.log(req.params.id);
  myEmployees = myEmployees.filter((employees) => employees.Name !== req.params.id);
  console.log(myEmployees);
  res.json("delete -> delete employee");
});

// 404 ERROR
app.get("*", (req, res) => {
  res.json("error404");
});

// Listen for Connections
app.listen(PORT);

// INDEX:
// breads.get("/", (req, res) => {
//   Baker.find().then((foundBakers) => {
//     Bread.find().then((foundBreads) => {
//       res.render("index", {
//         breads: foundBreads,
//         bakers: foundBakers,
//         title: "Index Page",
//       });
//     });
//   });
// });

// CREATE
// breads.post("/", (req, res) => {
//   // this is data from the view, and we're formatting it
//   if (!req.body.image) {
//     req.body.image = undefined;
//   }
//   if (req.body.hasGluten === "on") {
//     req.body.hasGluten = true;
//   } else {
//     req.body.hasGluten = false;
//   }
//   // send it to the model (which will send it to the db)
//   Bread.create(req.body);
//   res.redirect("/breads");
// });

// GET
// breads.get("/new", (req, res) => {
//   Baker.find().then((foundBakers) => {
//     res.render("new", {
//       bakers: foundBakers,
//     });
//   });
// });

// SHOW
// breads.get("/:id", (req, res) => {
//   Bread.findById(req.params.id)
//     .populate("baker")
//     .then((foundBread) => {
//       // console.log(baker);
//       // console.log(foundBread);
//       res.render("show", {
//         bread: foundBread,
//       });
//     })
//     .catch((err) => {
//       res.send("404");
//     });
// });

// DELETE
// breads.delete("/:id", (req, res) => {
//   Bread.findByIdAndDelete(req.params.id).then((deletedBread) => {
//     res.status(303).redirect("/breads");
//   });
// });

// UPDATE
// breads.put("/:id", (req, res) => {
//   if (req.body.hasGluten === "on") {
//     req.body.hasGluten = true;
//   } else {
//     req.body.hasGluten = false;
//   }
//   Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((updatedBread) => {
//     res.redirect(`/breads/${req.params.id}`);
//   });
// });

// EDIT
// breads.get("/:id/edit", (req, res) => {
//   Baker.find().then((foundBakers) => {
//     Bread.findById(req.params.id).then((foundBread) => {
//       res.render("edit", {
//         bread: foundBread,
//         bakers: foundBakers,
//       });
//     });
//   });
// });

// SEED DATA
// breads.get("/data/seed", (req, res) => {
//   Bread.insertMany([
//     {
//       name: "Rye",
//       hasGluten: true,
//       image:
//         "https://images.unsplash.com/photo-1595535873420-a599195b3f4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//     },
//     {
//       name: "French",
//       hasGluten: true,
//       image:
//         "https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
//     },
//     {
//       name: "Gluten Free",
//       hasGluten: false,
//       image:
//         "https://images.unsplash.com/photo-1546538490-0fe0a8eba4e6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80",
//     },
//     {
//       name: "Pumpernickel",
//       hasGluten: true,
//       image:
//         "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80",
//     },
//   ]).then((createdBreads) => {
//     res.redirect("/breads");
//   });
// });
