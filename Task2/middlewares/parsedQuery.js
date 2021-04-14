const parsedQuery = (req, res, next) => {
  req.parsedQuery = req.query;
  next();
};

export {
  parsedQuery,
};
