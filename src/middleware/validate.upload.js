const multer = require("multer");
const Joi = require("joi");
const path = require("path");

// Middleware function for validating file uploads
const validateUpload = (paramName, allowedExtensions) => {
  const upload = multer().single(paramName); // Multer middleware for single file upload

  return (req, res, next) => {
    upload(req, res, (error) => {
      // Handle Multer errors
      if (error instanceof multer.MulterError) {
        console.log("error", error.message);
        return res.status(422).json({ error: error.message });
      }
      // Handle other errors
      else if (error) {
        console.log("error", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Check if file exists in the request
      if (!req.file) {
        const errorMessage = `No file found. '${paramName}' field is required.`;
        console.log("error", errorMessage);
        return res.status(422).json({ error: errorMessage });
      }

      const { originalname } = req.file;
      const fileExtension = path.extname(originalname).toLowerCase(); // Extract file extension

      // Check if the file extension is allowed
      if (!allowedExtensions.includes(fileExtension)) {
        const errorMessage = `Invalid file extension. Allowed extensions are: ${allowedExtensions.join(", ")}`;
        console.log("error", errorMessage);
        return res.status(422).json({ error: errorMessage });
      }

      // If all validations pass, proceed to the next middleware/controller
      next();
    });
  };
};

module.exports = validateUpload;
