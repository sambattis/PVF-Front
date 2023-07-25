const sql = require("./db.js");

// constructor
const Education = function(education) {
  this.event_type = education.event_type;
  this.school = education.school;
  this.school_grade = education.school_grade;
  this.num_of_learners = education.num_of_learners;
  this.avg_score = education.avg_score;
};

Education.create = (newEducation, result) => {
  sql.query("INSERT INTO Education SET ?", newEducation, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Flora: ", { eduID: res.insertId, ...newEducation });
    result(null, { eduID: res.insertId, ...newEducation });
  });
};

Education.findById = (eduID, result) => {
  sql.query(`SELECT * FROM Education WHERE eduID = ${eduID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Flora: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Flora with the id
    result({ kind: "not_found" }, null);
  });
};

Education.getAll = (school, result) => {
  let query = "SELECT * FROM Education";

  if (school) {
    query += ` WHERE school LIKE '%${school}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Education: ", res);
    result(null, res);
  });
};

Education.updateById = (eduID, Education, result) => {
  sql.query(
    "UPDATE Education SET event_type = ?, school = ?, school_grade = ?, num_of_learners = ?, avg_score = ? WHERE eduID = ?",
    [Education.event_type, Education.school, Education.school_grade, Education.num_of_learners, Education.avg_score, eduID],
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

      console.log("updated Education: ", { eduID: eduID, ...Education });
      result(null, { eduID: eduID, ...Education });
    }
  );
};

Education.remove = (id, result) => {
  sql.query("DELETE FROM Education WHERE eduID = ?", id, (err, res) => {
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

    console.log("deleted Education with id: ", id);
    result(null, res);
  });
};

module.exports = Education;