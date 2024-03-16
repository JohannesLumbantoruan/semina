const Image = require('./model');

exports.post = async (req, res) => {
  try {
    const image = await Image.create({
      name: `/images/${req.file.filename}`
    });

    return res.status(201).json({
      success: true,
      image
    });
  } catch (error) {
    return next(error);
  }
};