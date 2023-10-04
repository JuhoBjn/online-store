const checkAdministrator = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  // Prevent missing request body from crashing the app.
  try {
    if (!req.body.role_id) {
      throw new Error("No role ID was provided");
    }
  } catch (error) {
    return res.status(401).send("No role ID was provided");
  }

  if (req.body.role_id < 3) {
    return res.status(401).send("Insufficient account role");
  }
  next();
};

module.exports = checkAdministrator;
