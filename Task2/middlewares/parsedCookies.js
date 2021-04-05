const parsedCookies = (req, res, next) => {
  if (req.cookies) {
    req.parsedCookies = req.cookies;
  }
  next();
};

module.exports = {
  parsedCookies,
};
