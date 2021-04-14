const parsedCookies = (req, res, next) => {
  if (req.cookies) {
    req.parsedCookies = req.cookies;
  }
  next();
};

export {
  parsedCookies,
};
