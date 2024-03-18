const Event = require('../../api/v1/events/model');
const { NotFoundError } = require('../../errors');

exports.checkEvent = async (id) => {
  const event = await Event.findById(id);

  if (!event) {
    throw new NotFoundError('Event not found');
  }
};