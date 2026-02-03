const validateReqBody = (req, res, next) => {
  // Only check for empty body on mutation requests
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false, message: "Bad request" });
    }
  }
  next();
};

const handleParsingErrs = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ success: false, message: "Invalid JSON" });
  }
  next(err);
}

module.exports = { validateReqBody, handleParsingErrs };