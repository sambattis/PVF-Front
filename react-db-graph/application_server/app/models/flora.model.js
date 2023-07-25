const sql = require("./db.js");

// constructor
const Flora = function(flora) {
  this.floraID = flora.floraID;
  this.growth_form = flora.growth_form;
  this.growing_method = flora.growing_method;
  this.veg_type = flora.veg_type;
};

Flora.create = (newFlora, result) => {
  sql.query("INSERT INTO Flora SET ?", newFlora, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Flora: ", { floraID: res.insertId, ...newFlora });
    result(null, { floraID: res.insertId, ...newFlora });
  });
};

Flora.findById = (floraID, result) => {
  sql.query(`SELECT * FROM Flora WHERE floraID = ${floraID}`, (err, res) => {
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

//We need to do some analysis on this function before implementation
/*
Organism.getAll = (common_name, result) => {
  let query = "SELECT * FROM Organism";

  if (common_name) {
    query += ` WHERE common_name LIKE '%${common_name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Organisms: ", res);
    result(null, res);
  });
};
*/

Flora.getAllInvasive = result => {
  sql.query("SELECT * FROM Flora NATURAL JOIN Organism WHERE invasive = true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Flora: ", res);
    result(null, res);
  });
};

Flora.updateById = (floraID, Flora, result) => {
  sql.query(
    "UPDATE Flora SET growth_form = ?, growing_method = ?, veg_type = ?, WHERE floraID = ?",
    [Flora.growth_form, Flora.growing_method, Flora.veg_type, floraID],
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

      console.log("updated Flora: ", { floraID: floraID, ...Flora });
      result(null, { floraID: floraID, ...Flora });
    }
  );
};

Flora.remove = (id, result) => {
  sql.query("DELETE FROM Flora WHERE floraID = ?", id, (err, res) => {
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

    console.log("deleted Flora with id: ", id);
    result(null, res);
  });
};

module.exports = Flora;