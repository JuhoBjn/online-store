const checkPremium = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    if (req.body.premium === undefined) {
      throw new Error("No premium was provided");
    }
  } catch (error) {
    return res.status(400).send("No premium was provided");
  }

  if (req.body.premium === 0) {
    return res
      .status(403)
      .send("This functionality is reserved for premium users");
  }
  next();
};

module.exports = checkPremium;
