module.exports = app => {
  const flora_survey = require("../controllers/flora_survey.controller.js");

  var router = require("express").Router();

  // Create a new Flora Survey
  router.post("/", flora_survey.create);

  // Retrieve all invasive Flora Survey
  router.get("/invasive", flora_survey.findAllInvasive);

  // Retrieve a single Flora Survey with id
  router.get("/:id", flora_survey.findOne);

  // Delete a Flora Survey with id
  router.delete("/:id", flora_survey.delete);

  app.use('/api/flora_survey', router);
};