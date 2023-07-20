const Education = require("../models/education.model.js");

// Create and Save a new Organism
exports.create = (req, res) => {
	// Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Organism
  const education = new Education({
    event_type: req.body.event_type,
    school: req.body.school,
    school_grade: req.body.school_grade,
    num_of_learners: req.body.num_of_learners,
    avg_score: req.body.avg_score
  });

  // Save Organism in the database
  Education.create(education, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Organism."
      });
    else res.send(data);
  });
};


// Retrieve all Organism from the database (with condition).
exports.findAll = (req, res) => {
  const school = req.query.school;

  Education.getAll(school, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving organisms."
      });
    else res.send(data);
  });
};


exports.findAllInvasive = (req, res) => {
  Education.getAllInvasive((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving organisms."
      });
    else res.send(data);
  });
};

// Find a single Organism with a id
exports.findOne = (req, res) => {
    Education.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Education with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Education with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Organism identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Education.updateById(
    req.params.id,
    new Education(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Education with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Education with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Organism with the specified id in the request
exports.delete = (req, res) => {
    Education.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Education with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Education with id " + req.params.id
        });
      }
    } else res.send({ message: `Education was deleted successfully!` });
  });
};