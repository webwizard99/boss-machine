const checkMillionDollarIdea = (req, res, next) => {
  const { numWeeks, weeklyRevenue } = req.body;

  if (numWeeks * weeklyRevenue < 1000000) {
    res.status(400).send('idea is not a million dollar idea!');
  } else {
    next();
  }

};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
