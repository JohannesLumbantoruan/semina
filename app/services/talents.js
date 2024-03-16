const Talent = require('../api/v1/talents/model');
const { NotFoundError } = require('../errors');

exports.checkTalent = async (id) => {
  const talent = await Talent.findById(id);

  if (!talent) {
    throw new NotFoundError('Talent not found');
  }
};