const User = require('../../api/v1/users/model');
const BadRequestError = require('../../errors/bad-request-error');

exports.checkUserByEmail = async (email) => {
  const user = await User.findOne({ email });

  if (user) {
    throw new BadRequestError('User with this email already exist');
  }
};