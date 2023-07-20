const sql = require("./db.js");

// constructor
const Fauna_Survey = function(fauna_survey) {
  this.faunaID = fauna_survey.faunaID;
  this.survey_date = fauna_survey.survey_date;
  this.sex = fauna_survey.sex;
  this.latitude = fauna_survey.latitude;
  this.longitude = fauna_survey.longitude;
  this.activity = fauna_survey.activity;
  this.life_stage = fauna_survey.life_stage;
};

Fauna_Survey.create = (newFaunaSurvey, result) => {
  sql.query("INSERT INTO Fauna_Survey SET ?", newFaunaSurvey, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Fauna Survey: ", { faunaSID: res.insertId, ...newFaunaSurvey });
    result(null, { faunaSID: res.insertId, ...newFaunaSurvey });
  });
};

Fauna_Survey.findById = (faunaSID, result) => {
  sql.query(`SELECT * FROM Fauna_Survey WHERE faunaSID = ${faunaSID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Fauna Survey: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Fauna Survey with the id
    result({ kind: "not_found" }, null);
  });
};

Fauna_Survey.getAll = (result) => {
  let query = "SELECT * FROM Fauna_Survey";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Fauna Surveys: ", res);
    result(null, res);
  });
};


Fauna_Survey.updateById = (faunaSID, Fauna_Survey, result) => {
  sql.query(
    "UPDATE Fauna_Survey SET faunaID = ?, survey_date = ?, sex = ?, latitude = ?, longitude = ?, activity = ?, life_stage = ? WHERE faunaSID = ?",
    [Fauna_Survey.faunaID, Fauna_Survey.survey_date, Fauna_Survey.sex, Fauna_Survey.latitude, Fauna_Survey.longitude, Fauna_Survey.activity, Fauna_Survey.life_stage, faunaSID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Organism with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Fauna Survey: ", { faunaID: faunaID, ...Fauna_Survey });
      result(null, { faunaID: faunaID, ...Fauna_Survey });
    }
  );
};

Fauna_Survey.remove = (id, result) => {
  sql.query("DELETE FROM Fauna_Survey WHERE faunaSID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Organism with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Fauna Survey with id: ", id);
    result(null, res);
  });
};

module.exports = Fauna_Survey;