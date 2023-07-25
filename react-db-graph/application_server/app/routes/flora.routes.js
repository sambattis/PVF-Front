module.exports = app => {
  const flora = require("../controllers/flora.controller.js");

  var router = require("express").Router();

  // Create a new Organisms
  router.post("/", flora.create);

  // Retrieve all invasive Organisms
  router.get("/invasive", flora.findAllInvasive);

  // Retrieve a single Organism with id
  router.get("/:id", flora.findOne);

  // Delete a Organism with id
  router.delete("/:id", flora.delete);

  app.use('/api/flora', router);
};