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