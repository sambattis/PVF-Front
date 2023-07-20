const sql = require("./db.js");

// constructor
const Flora_Survey = function(flora_survey) {
  this.floraID = flora_survey.floraID;
  this.survey_date = flora_survey.survey_date;
  this.latitude = flora_survey.latitude;
  this.longitude = flora_survey.longitude;
};

Flora_Survey.create = (newFloraSurvey, result) => {
  sql.query("INSERT INTO Flora_Survey SET ?", newFloraSurvey, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Flora_Survey: ", { floraSID: res.insertId, ...newFloraSurvey });
    result(null, { floraSID: res.insertId, ...newFloraSurvey });
  });
};

Flora_Survey.findById = (floraSID, result) => {
  sql.query(`SELECT * FROM Flora_Survey WHERE floraSID = ${floraSID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Flora_Survey: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Flora with the id
    result({ kind: "not_found" }, null);
  });
};

Flora_Survey.getAllInvasive = result => {
  sql.query("SELECT * FROM Flora_Survey NATURAL JOIN Organism WHERE invasive = true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Flora_Survey: ", res);
    result(null, res);
  });
};

Flora_Survey.updateById = (floraSID, Flora_Survey, result) => {
  sql.query(
    "UPDATE Flora_Survey SET floraID = ?, survey_date = ?, latitude = ?, longitude = ? WHERE floraSID = ?",
    [Flora_Survey.floraID, Flora_Survey.growth_form, Flora_Survey.growing_method, Flora_Survey.veg_type, floraSID],
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

      console.log("updated Flora_Survey: ", { floraSID: floraSID, ...Flora_Survey });
      result(null, { floraSID: floraSID, ...Flora_Survey });
    }
  );
};

Flora_Survey.remove = (id, result) => {
  sql.query("DELETE FROM Flora_Survey WHERE floraSID = ?", id, (err, res) => {
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

    console.log("deleted Flora Survey with id: ", id);
    result(null, res);
  });
};

module.exports = Flora_Survey;