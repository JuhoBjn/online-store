const checkAdministrator = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  // Prevent missing request body from crashing the app.
  try {
    if (!req.user?.role_id) {
      throw new Error("No role ID was provided");
    }
  } catch (error) {
    return res.status(401).send({ message: "No role ID was provided" });
  }

  if (req.user?.role_id < 3) {
    return res.status(401).send({ message: "Insufficient account role" });
  }
  next();
};

module.exports = checkAdministrator;
