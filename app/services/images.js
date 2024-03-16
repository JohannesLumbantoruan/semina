const Image = require('../api/v1/images/model');
const { NotFoundError } = require('../errors');

exports.checkImage = async (id) => {
  const image = await Image.findById(id);

  if (!image) {
    throw new NotFoundError('Image not found');
  }
}