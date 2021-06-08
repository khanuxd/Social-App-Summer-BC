const multer = require('multer');
const sharp = require('sharp');

//handle file uploads
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image. Please upload only images.'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPostImages = upload.fields([{ name: 'photos', maxCount: 8 }]);

exports.resizePostImages = async (req, res, next) => {
  try {
    if (!req.files.photos) {
      console.log('in resize photos');
      return next();
    }

    req.body.photos = [];
    await Promise.all(
      req.files.photos.map(async (file, index) => {
        const filename = `post-${req.user.id}-${Date.now()}-${index + 1}.jpeg`;
        await sharp(file.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`/client/assets/images/posts/${filename}`);
        req.body.photos.push(filename);
      })
    );

    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error');
  }
};
