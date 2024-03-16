const Category = require('./model');
const { NotFoundError, BadRequestError } = require('../../../errors');

exports.get = async (req, res, next) => {
  try {
    const categories = await Category
    .find()
    .select({ name: 1 });

    return res.json({
      success: true,
      categories
    });
  } catch (error) {
    return next(error);
  }
};

exports.post = async (req, res, next) => {
  try {
    const { name } = req.body;

    const isExist = await Category.findOne({ name });

    if (isExist) {
      throw new BadRequestError('Category already exist');
    }

    const category = await Category.create({ name });

    return res.status(201).json({
      success: true,
      category
    });
  } catch (error) {
    return next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    return res.json({
      success: true,
      category
    });
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const category = await Category.findOneAndUpdate(
      { _id: id },
      { name },
      { new: true, runValidators: true }
    );

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    return res.json({
      success: true,
      category
    });
  } catch (error) {
    return next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    return res.json({
      success: true,
      message: 'Category successfully deleted'
    });
  } catch (error) {
    return next(error);
  }
};