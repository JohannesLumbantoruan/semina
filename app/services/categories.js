const Category = require('../api/v1/categories/model');
const { NotFoundError } = require('../errors');

exports.checkCategory = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new NotFoundError('Category not found');
  }
};