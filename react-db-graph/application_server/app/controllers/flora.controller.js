const Flora = require("../models/flora.model.js");

// Create and Save a new Organism
exports.create = (req, res) => {
	// Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Organism
  const flora = new Flora({
    floraID: req.body.floraID,
    growth_form: req.body.growth_form,
    growing_method: req.body.growing_method,
    veg_type: req.body.veg_type,
  });

  // Save Organism in the database
  Flora.create(flora, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Organism."
      });
    else res.send(data);
  });
};

/*
// Retrieve all Organism from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Organism.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving organisms."
      });
    else res.send(data);
  });
};
*/

exports.findAllInvasive = (req, res) => {
  Flora.getAllInvasive((err, data) => {
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
    Flora.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Flora with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Flora with id " + req.params.id
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

  Flora.updateById(
    req.params.id,
    new Flora(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Flora with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Flora with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Organism with the specified id in the request
exports.delete = (req, res) => {
    Flora.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Flora with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Flora with id " + req.params.id
        });
      }
    } else res.send({ message: `Flora was deleted successfully!` });
  });
};