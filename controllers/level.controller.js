const Level = require("../models/level.model.js");

/**
 * generate random string base on percentage
 * @returns
 */
function randomStr(){
	var randNumber = Math.random();
	var chance = 0.7;
	var interval = 0.1;
	if (randNumber      <= chance)               { return "N"; }
	else if (randNumber <= (chance += interval)) { return "H"; }
	else if (randNumber <= (chance += interval)) { return "V"; }
	else if (randNumber <= (chance += interval)) { return "S"; }
}

// Create and Save a new Level
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  // manipulate to create board string
  var h;
  var i;
  var board_arr = [];
  var board_str;
  for (h = 0; h < 8; h++) {
	  board_str = '';
	  for (i = 0; i < 8; i++) {
	  	board_str += randomStr();
	  }
	  board_arr.push(board_str);
  }
 	
  // Create a Level
  const level = new Level({
    board: JSON.stringify(board_arr)
  });

  // Save Level in the database
  Level.create(level, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the level board."
      });
    else res.send(data);
  });
};

// Find a single Level with a levelId
exports.findOne = (req, res) => {
  Level.findById(req.params.levelId, (err, data) => {
	    if (err) {
	      if (err.kind === "not_found") {
	        res.status(404).send({
	          message: `Not found Level board with id ${req.params.levelId}.`
	        });
	      } else {
	        res.status(500).send({
	          message: "Error retrieving level board with id " + req.params.levelId
	        });
	      }
	    } 
	    
	    // TODO process the move 
	    
	    else res.send(data);
  });
};

// find all level boards
exports.findAll = (req, res) => {
  Level.findAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving levels."
      });
    else res.send(data);
  });
};

// update a level board
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Request is empty!"
    });
  }

  Level.updateById(
    req.params.levelId,
    new Level(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found level with id ${req.params.levelId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating level with id " + req.params.levelId
          });
        }
      }
       else{
          res.send(data);
       }
    }
  );
};

// delete a level object
exports.delete = (req, res) => {
  Level.remove(req.params.levelId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found level with id ${req.params.levelId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete level with id " + req.params.levelId
        });
      }
    } else res.send({ message: `level was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Level.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all levels."
      });
    else res.send({ message: `All levels were deleted successfully!` });
  });
};