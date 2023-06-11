const { ObjectId } = require("mongodb");

const validateId = (req, res, next) => {
  const { id } = req.params;

  // Check if id is a valid MongoDB ObjectId
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  // Pass control to the next middleware or route handler
  next();
};
module.exports = validateId;
