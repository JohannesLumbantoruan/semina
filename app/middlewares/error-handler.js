function errorHandler(err, req, res, next) {
  console.log(err);

  let message = 'Internal server error';
  let statusCode = 500;

  if (err.statusCode) {
    const code = parseInt(err.statusCode);

    if (code >= 100 && code <= 599) {
      statusCode = code;

      if (err.message) {
        message = err.message;
      }
    }
  }

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Payload not valid'
  }

  return res.status(statusCode).json({
    success: false,
    message
  });
}

module.exports = errorHandler;