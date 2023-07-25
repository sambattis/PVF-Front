module.exports = app => {
    const fauna_survey = require("../controllers/fauna_survey.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Fauna Survey
    router.post("/", fauna_survey.create);

    //Modify an existing Fauna Survey
    router.put("/:id", fauna_survey.update);
  
    // Retrieve all Fauna Surveys
    router.get("/", fauna_survey.findAll);
  
    // Retrieve a single Fauna Survey with id
    router.get("/:id", fauna_survey.findOne);
  
    // Delete a Fauna Surcey with id
    router.delete("/:id", fauna_survey.delete);
  
    app.use('/api/fauna_survey', router);
  };