const { ForbiddenError } = require('../../../errors');
const { checkOrganizer } = require('../../../services/mongoose/organizers');
const { checkUserByEmail } = require('../../../services/mongoose/users');
const User = require('./model');

exports.post = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role,
      organizer
    } = req.body;

    await checkOrganizer(organizer);
    await checkUserByEmail(email);

    if (role === 'admin' && req.user.role !== 'organizer') {
      throw new ForbiddenError('Only organizer can create an admin');
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      organizer
    });

    return res.status(201).json({
      success: true,
      user
    });
  } catch (error) {
    return next(error);
  }
};