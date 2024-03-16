const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    cb(null, true);
  } else {
    cb({
      message: 'Unsupported file format'
    }, false);
  }
}

const upload = multer({
  storage,
  limits: {
    fileSize: '3mb'
  },
  fileFilter
});

module.exports = upload;