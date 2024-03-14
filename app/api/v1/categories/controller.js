const handleError = require('../../../utils/handleError');
const Category = require('./model');

exports.get = async (req, res) => {
  try {
    const categories = await Category
      .find()
      .select({ name: 1 });

    res.json({
      success: true,
      categories
    });
  } catch (error) {
    return handleError(res, error);
  }
};

exports.post = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });

    res.status(201).json({
      success: true,
      category
    });
  } catch (error) {
    return handleError(res, error);
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      const error = new Error('Category not found');
      error.code = 404;

      throw error;
    }

    res.json({
      success: true,
      category
    });
  } catch (error) {
    return handleError(res, error);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const category = await Category.findOneAndUpdate(
      { _id: id },
      { name },
      { new: true, runValidators: true }
    );

    if (!category) {
      const error = new Error('Category not found');
      error.code = 404;

      throw error;
    }

    res.json({
      success: true,
      category
    });
  } catch (error) {
    return handleError(res, error);
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      const error = new Error('Category not found');
      error.code = 404;

      throw error;
    }

    res.json({
      success: true,
      message: 'Category successfully deleted'
    });
  } catch (error) {
    return handleError(res, error);
  }
};