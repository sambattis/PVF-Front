const sql = require("./db.js");

// constructor
const Organism = function(organism) {
  this.species = organism.species;
  this.genus = organism.genus;
  this.common_name = organism.common_name;
  this.conservation_status = organism.conservation_status;
  this.alien = organism.alien;
  this.invasive = organism.invasive;
};

Organism.create = (newOrganism, result) => {
  sql.query("INSERT INTO Organism SET ?", newOrganism, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Organism: ", { orgID: res.insertId, ...newOrganism });
    result(null, { orgID: res.insertId, ...newOrganism });
  });
};

Organism.findById = (orgID, result) => {
  sql.query(`SELECT * FROM Organism WHERE orgID = ${orgID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Organism: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Organism with the id
    result({ kind: "not_found" }, null);
  });
};

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

Organism.getAllInvasive = result => {
  sql.query("SELECT * FROM Organism WHERE invasive=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("organisms: ", res);
    result(null, res);
  });
};


Organism.updateById = (orgID, Organism, result) => {
  sql.query(
    "UPDATE Organism SET genus = ?, species = ?, common_name = ?, conservation_status = ?, alien = ?, invasive = ? WHERE orgID = ?",
    [Organism.genus, Organism.species, Organism.common_name, Organism.conservation_status, Organism.alien, Organism.invasive, orgID],
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

      console.log("updated Organism: ", { orgID: orgID, ...Organism });
      result(null, { orgID: orgID, ...Organism });
    }
  );
};

Organism.remove = (id, result) => {
  sql.query("DELETE FROM Organism WHERE orgID = ?", id, (err, res) => {
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

    console.log("deleted Organism with id: ", id);
    result(null, res);
  });
};

module.exports = Organism;