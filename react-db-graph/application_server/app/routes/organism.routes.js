module.exports = app => {
  const organism = require("../controllers/organism.controller.js");

  var router = require("express").Router();

  // Create a new Organisms
  router.post("/", organism.create);

  // Retrieve all Organisms
  router.get("/", organism.findAll);

  // Retrieve all invasive Organisms
  router.get("/invasive", organism.findAllInvasive);

  // Retrieve a single Organism with id
  router.get("/:id", organism.findOne);

  // Delete a Organism with id
  router.delete("/:id", organism.delete);

  app.use('/api/organism', router);
};