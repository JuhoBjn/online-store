const checkCaretaker = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  // Prevent the app from crashing in case of missing request body
  try {
    if (!req.user?.role_id) {
      throw new Error("No role ID was provided");
    }
  } catch (error) {
    return res.status(401).send({ message: "No role ID was provided" });
  }

  if (req.user?.role_id === 1) {
    return res.status(401).send({ message: "Insufficient account role" });
  }
  next();
};

module.exports = checkCaretaker;
