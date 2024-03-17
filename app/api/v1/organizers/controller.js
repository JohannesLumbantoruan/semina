const { NotFoundError } = require('../../../errors');
const Organizer = require('./model');

exports.post = async (req, res, next) => {
  try {
    const { name } = req.body;

    const organizer = await Organizer.create({
      name
    });

    return res.status(201).json({
      success: true,
      organizer
    });
  } catch (error) {
    return next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const organizers = await Organizer.find();

    return res.json({
      success: true,
      organizers
    });
  } catch (error) {
    return next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const organizer = await Organizer.findById(id);

    if (!organizer) {
      throw new NotFoundError('Organizer not found');
    }

    return res.json({
      success: true,
      organizer
    });
  } catch (error) {
    return next(error);
  }
};