const Fauna_Survey = require("../models/fauna_survey.model.js");

// Create and Save a new Fauna Survey
exports.create = (req, res) => {
	// Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Organism
  const fauna_survey = new Fauna_Survey({
    faunaID: req.body.faunaID,
    survey_date: req.body.survey_date,
    sex: req.body.sex,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    activity: req.body.activity,
    life_stage: req.body.life_stage
  });


  // Save Fauna Survey in the database
  Fauna_Survey.create(fauna_survey, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Fauna Survey."
      });
    else res.send(data);
  });
};

// Retrieve all Fauna Surveys from the database (with condition).
exports.findAll = (req, res) => {

  Fauna_Survey.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Fauna Surveys."
      });
    else res.send(data);
  });
};


// Find a single Fauna Survey with a id
exports.findOne = (req, res) => {
    Fauna_Survey.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Fauna Surveys with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Fauna Surveys with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Fauna Survey identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Fauna_Survey.updateById(
    req.params.id,
    new Fauna_Survey(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Fauna Survey with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Fauna Survey with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Organism with the specified id in the request
exports.delete = (req, res) => {
    Fauna_Survey.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Fauna Survey with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Fauna Survey with id " + req.params.id
        });
      }
    } else res.send({ message: `Fauna Survey was deleted successfully!` });
  });
};