const Organism = require("../models/organism.model.js");

// Create and Save a new Organism
exports.create = (req, res) => {
	// Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Organism
  const organism = new Organism({
    species: req.body.species,
    genus: req.body.genus,
    common_name: req.body.common_name,
    conservation_status: req.body.conservation_status,
    alien: req.body.alien,
    invasive: req.body.invasive
  });

  // Save Organism in the database
  Organism.create(organism, (err, data) => {
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

exports.findAllInvasive = (req, res) => {
  Organism.getAllInvasive((err, data) => {
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
    Organism.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Organism with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Organism with id " + req.params.id
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

  console.log(req.body);

  Organism.updateById(
    req.params.id,
    new Organism(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Organism with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Organism with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Organism with the specified id in the request
exports.delete = (req, res) => {
    Organism.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Organism with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Organism with id " + req.params.id
        });
      }
    } else res.send({ message: `Organism was deleted successfully!` });
  });
};