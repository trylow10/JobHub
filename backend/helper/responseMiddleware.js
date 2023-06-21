// responseMiddleware.js

const { signature } = require("../crypto/functions");

// Middleware to format and send responses
const responseMiddleware = (req, res, next) => {
  res.customJson = (response) => {
    const signedResponse = { ...response, signature: signature(response) };
    res.json(signedResponse);
  };

  res.customError = (statusCode, message) => {
    const response = { success: false, message };
    res.status(statusCode).customJson(response);
  };

  next();
};

module.exports = responseMiddleware;
