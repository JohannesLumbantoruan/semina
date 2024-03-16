const Category = require('./model');
const { NotFoundError, BadRequestError } = require('../../../errors');

exports.get = async (req, res) => {
  const categories = await Category
    .find()
    .select({ name: 1 });

  return res.json({
    success: true,
    categories
  });
};

exports.post = async (req, res, next) => {
  try {
    const { name } = req.body;

    const isExist = await Category.findOne({ name });

    if (isExist) {
      return next(new BadRequestError('Category already exist'));
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
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category) {
    return next(new NotFoundError('Category not found'));
  }

  return res.json({
    success: true,
    category
  });
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  
  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  if (!category) {
    return next(new NotFoundError('Category not found'));
  }

  return res.json({
    success: true,
    category
  });
};

exports.delete = async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    return next(new NotFoundError('Category not found'));
  }

  return res.json({
    success: true,
    message: 'Category successfully deleted'
  });
};