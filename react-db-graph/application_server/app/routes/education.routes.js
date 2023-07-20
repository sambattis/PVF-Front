module.exports = app => {
  const education = require("../controllers/education.controller.js");

  var router = require("express").Router();

  // Create a new Organisms
  router.post("/", education.create);

  //Modify an existing Fauna Survey
  router.put("/:id", education.update);

  // Retrieve all Organisms
  router.get("/", education.findAll);

  // Retrieve a single Organism with id
  router.get("/:id", education.findOne);

  // Delete a Organism with id
  router.delete("/:id", education.delete);

  app.use('/api/education', router);
};