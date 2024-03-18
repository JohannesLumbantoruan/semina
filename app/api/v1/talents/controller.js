const { NotFoundError, BadRequestError } = require('../../../errors');
const { checkImage } = require('../../../services/mongoose/images');
const Talent = require('./model');

exports.get = async (req, res, next) => {
  try {
    const talents = await Talent
      .find()
      .populate({
        path: 'image',
        select: {
          name: 1
        }
      })
      .select({
        name: 1,
        email: 1,
        role: 1,
        image: 1
      });

    return res.json({
      success: true,
      talents
    });
  } catch (error) {
    return next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const talent = await Talent
      .findById(id)
      .populate('image');

    if (!talent) {
      throw new NotFoundError('Talent not found');
    }

    return res.json({
      success: true,
      talent
    });
  } catch (error) {
    return next(error);
  }
};

exports.post = async (req, res, next) => {
  try {
    const { name, role, image, email } = req.body;

    await checkImage(image);

    const isExist = await Talent.findOne({ email });

    if (isExist) {
      throw new BadRequestError('Talent already exist');
    }

    const talent = await Talent.create({
      name,
      email,
      role,
      image
    });

    return res.status(201).json({
      success: true,
      talent
    });
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, role, email, image } = req.body;
  
    const isExist = await Talent.findById(id);
  
    if (!isExist) {
      throw new NotFoundError('Talent does not exist');
    }
  
    const talent = await Talent.findByIdAndUpdate(id, {
      name,
      email,
      role,
      image
    }, {
      new: true,
      runValidators: true
    });
  
    return res.json({
      success: true,
      talent
    });
  } catch (error) {
    return next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const isExist = await Talent.findById(id);

    if (!isExist) {
      throw new NotFoundError('Talent not found');
    }

    await Talent.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: 'Talent successfully deleted'
    });
  } catch (error) {
    return next(error);
  }
};