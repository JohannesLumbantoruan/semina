function handleError(res, error) {
  console.log(error);
  
  let message = 'Internal server error';
  let code = 500;

  const codePattern = /^\d{3}$/;

  if (error.code) {
    if (codePattern.test(error.code)) {
      const errorCode = Number.parseInt(error.code);

      if (errorCode >= 100 && errorCode <= 599) {
        code = errorCode;

        if (error.message) {
          message = error.message;
        }
      }
    }
  }

  return res.status(code).json({
    success: false,
    message
  });
}

module.exports = handleError;