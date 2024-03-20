const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  try {
    const token = req.get('Authorization').split(' ')[1];

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = payload;

    return next();
  } catch (error) {
    return next(error);
  }
}

module.exports = authenticate;