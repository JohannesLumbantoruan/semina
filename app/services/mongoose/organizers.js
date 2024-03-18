const Organizer = require('../../api/v1/organizers/model');
const NotFoundError = require('../../errors/not-found-error');

exports.checkOrganizer = async (id) => {
  const organizer = await Organizer.findById(id);

  if (!organizer) {
    throw new NotFoundError('Organizer not found');
  }
};