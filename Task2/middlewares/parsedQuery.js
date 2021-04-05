const parsedQuery = (req, res, next) => {
  req.parsedQuery = req.query;
  next();
};

module.exports = {
  parsedQuery,
};
