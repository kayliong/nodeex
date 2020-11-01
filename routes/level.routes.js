module.exports = app => {
  const level = require("../controllers/level.controller.js");

  // Create a new level board 
  app.post("/start-level", level.create);

  // Retrieve all levels
  app.get("/levels", level.findAll);

  // Retrieve a single level with levelid
  app.get("/level/:levelId", level.findOne);

  // Update a level with levelId
  app.put("/level/:levelId", level.update);

  // Delete a level with levelId
  app.delete("/level/:levelId", level.delete);

  // Delete all levels
  app.delete("/levels", level.deleteAll);
};