const { NotFoundError, BadRequestError } = require('../../../errors');
const { checkCategory } = require('../../../services/mongoose/categories');
const { checkEvent } = require('../../../services/mongoose/events');
const { checkImage } = require('../../../services/mongoose/images');
const { checkTalent } = require('../../../services/mongoose/talents');
const Event = require('./model');

exports.get = async (req, res, next) => {
  try {
    const events = await Event
      .find()
      .populate({
        path: 'image',
        select: {
          name: 1
        }
      })
      .populate({
        path: 'category',
        select: {
          name: 1
        }
      })
      .populate({
        path: 'talent',
        select: {
          name: 1,
          email: 1,
          role: 1,
          image: 1
        },
        populate: {
          path: 'image',
          select: {
            name: 1
          }
        }
      });

    return res.json({
      success: true,
      events
    });
  } catch (error) {
    return next(error);
  }
}

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const event = await Event
      .findById(id)
      .populate('image')
      .populate('category')
      .populate({
        path: 'talent',
        populate: 'image'
      });

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    return res.json({
      success: true,
      event
    });
  } catch (error) {
    return next(error);
  }
}

exports.post = async (req, res, next) => {
  try {
    const {
      title,
      date,
      about,
      tagline,
      venueName,
      keyPoint,
      status,
      tickets,
      image,
      category,
      talent
    } = req.body;

    await checkImage(image);
    await checkCategory(category);
    await checkTalent(talent);

    const isExist = await Event.findOne({ title });

    if (isExist) {
      throw new BadRequestError('Event with this title already exists');
    }

    const event = await Event.create({
      title,
      date,
      about,
      tagline,
      venueName,
      keyPoint,
      status,
      tickets,
      image,
      category,
      talent
    });

    return res.status(201).json({
      success: true,
      event
    });
  } catch (error) {
    return next(error);
  }
}

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      title,
      date,
      about,
      tagline,
      venueName,
      keyPoint,
      status,
      tickets,
      image,
      category,
      talent
    } = req.body;

    await checkImage(image);
    await checkCategory(category);
    await checkTalent(talent);

    const isTitleExist = await Event.findOne({
      title,
      _id: { $ne: id }
    });

    if (isTitleExist) {
      throw new BadRequestError('Event with this title already exist');
    }

    const event = await Event.findByIdAndUpdate(id, {
      title,
      date,
      about,
      tagline,
      venueName,
      keyPoint,
      status,
      tickets,
      image,
      category,
      talent
    }, {
      new: true,
      runValidators: true
    });

    return res.json({
      success: true,
      event
    });
  } catch (error) {
    return next(error);
  }
}

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const isExist = await Event.findById(id);

    if (!isExist) {
      throw new NotFoundError('Event does not exist');
    }

    await Event.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: 'Event successfully deleted'
    });
  } catch (error) {
    return next(error);
  }
}

exports.updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    await checkEvent(id);

    const event = await Event.findById(id);

    if (event.status === 'Draft') {
      await Event.findByIdAndUpdate(id, {
        status: 'Published'
      });
    } else {
      await Event.findByIdAndUpdate(id, {
        status: 'Draft'
      });
    }

    return res.json({
      success: true,
      message: 'Event status successfully changed'
    });
  } catch (err) {
    return next(err);
  }
}