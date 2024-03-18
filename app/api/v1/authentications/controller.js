const { UnauthorizedError } = require('../../../errors');
const User = require('../users/model');
const Authentication = require('./model');
const jwt = require('../../../services/jwt');
const toObject = require('../../../utils/toObject');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User
      .findOne({ email })
      .select({
        name: 1,
        email: 1,
        role:1,
        organizer: 1,
        password: 1
      });

    if (!user) {
      throw new UnauthorizedError('Wrong credentials');
    }

    await user.comparePassword(password);

    const payload = toObject(user._doc);

    const accessToken = jwt.createAccessToken(payload);
    const refreshToken = jwt.createRefreshToken(payload);

    const authentication = await Authentication.create({
      accessToken,
      refreshToken,
      user: user._id
    });

    return res.status(201).json({
      success: true,
      authentication
    });
  } catch (error) {
    return next(error);
  }
};