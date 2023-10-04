const checkCaretaker = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  if (req.body.role_id === 1) {
    return res.status(401).send("Insufficient account role");
  }
  next();
};

module.exports = checkCaretaker;
