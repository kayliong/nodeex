const sql = require("./db_conn.js");

// constructor
const Level = function(level) {
  this.board = level.board;
};

// model create level
Level.create = (newLevel, result) => {
  sql.query("INSERT INTO level SET ?", newLevel, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created level board: ", { id: res.insertId, ...newLevel });
    result(null, { id: res.insertId, ...newLevel });
  });
};

// model find level by ID
Level.findById = (levelId, result) => {
  sql.query(`SELECT * FROM level WHERE id = ${levelId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found level board with the id
    result({ kind: "not_found" }, null);
  });
};

// model find all level
Level.findAll = result => {
  sql.query("SELECT * FROM level", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("levels: ", res);
    result(null, res);
  });
};

// model update single level
Level.updateById = (id, level, result) => {
  
  sql.query(
    "UPDATE level SET board = ? WHERE id = ?",
    [level.board, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found level with the id
        result({ kind: "not_found" }, null);
        return;
      }
      
      console.log("updated level: ", { id: id, ...level });
      result(null, { id: id, ...level });
    }
  );
};

// remove a level
Level.remove = (id, result) => {
  sql.query("DELETE FROM level WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found level with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted level with id: ", id);
    result(null, res);
  });
};

// remove all level
Level.removeAll = result => {
  sql.query("DELETE FROM level", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
      // truncate table after remove all records
      sql.query("TRUNCATE TABLE level", (err, res) => {
        if (err) {
          console.log("error: ", err);
        }
    
        console.log(`Truncate table levels`);
      });

    console.log(`deleted ${res.affectedRows} levels`);
    result(null, res);
  });
};

module.exports = Level;