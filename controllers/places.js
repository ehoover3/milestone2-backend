const router = require("express").Router();
const db = require("../models");

router.get("/", (req, res) => {
  db.Employee.find()
    .then((employees) => {
      res.render("employee/index", { employees });
    })
    .catch((err) => {
      res.render("error404");
    });
});

router.post("/", (req, res) => {
  db.Employee.create(req.body)
    .then(() => {
      res.redirect("/employees");
    })
    .catch((err) => {
      if (err && err.name == "ValidationError") {
        let message = "Validation Error: ";
        for (var field in err.errors) {
          message += `${field} was ${err.errors[field].value}. `;
          message += `${err.errors[field].message}`;
        }
        console.log("Validation error message", message);
        res.render("employees/new", { message });
      } else {
        res.render("error404");
      }
    });
});

router.get("/new", (req, res) => {
  res.render("employees/new");
});

router.get("/:id", (req, res) => {
  db.Employee.findById(req.params.id)
    .populate("comments")
    .then((place) => {
      console.log(place.comments);
      res.render("employees/show", { place });
    })
    .catch((err) => {
      console.log("err", err);
      res.render("error404");
    });
});

router.put("/:id", (req, res) => {
  db.Employee.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect(`/employees/${req.params.id}`);
    })
    .catch((err) => {
      console.log("err", err);
      res.render("error404");
    });
});

router.delete("/:id", (req, res) => {
  db.Employee.findByIdAndDelete(req.params.id)
    .then((place) => {
      res.redirect("/employees");
    })
    .catch((err) => {
      console.log("err", err);
      res.render("error404");
    });
});

router.get("/:id/edit", (req, res) => {
  db.Employee.findById(req.params.id)
    .then((place) => {
      res.render("employees/edit", { place });
    })
    .catch((err) => {
      res.render("error404");
    });
});

router.post("/:id/comment", (req, res) => {
  if (req.body.rant) {
    req.body.rant = true;
  } else {
    req.body.rant = false;
  }
  db.Employee.findById(req.params.id)
    .then((place) => {
      console.log(db.Comment);
      db.Comment.create(req.body)
        .then((comment) => {
          place.comments.push(comment.id);
          place.save().then(() => {
            res.redirect(`/employees/${req.params.id}`);
          });
        })
        .catch((err) => {
          console.log(err);
          res.render("error404");
        });
    })
    .catch((err) => {
      res.render("error404");
    });
});

router.post("/:id/rant", (req, res) => {
  res.send("GET /employees/:id/rant stub");
});

router.delete("/:id/comment/:commentId", (req, res) => {
  db.Employee.findOne({ id: req.params.id })
    .then((place) => {
      db.Comment.findByIdAndDelete(req.params.commentId).then((place) => {
        res.redirect(`/employees/${req.params.id}`);
      });
    })
    .catch((err) => {
      console.log("err", err);
      res.render("error404");
    });
});

module.exports = router;
