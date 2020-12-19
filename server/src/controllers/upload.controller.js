const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single('file');

module.exports = {
  upload: async (req, res) => {
    upload(req, res, function (err) {
      if (err) {
        console.log(err);
      } else {
        const { file } = req;
        res.status(200).json({ success: true, message: 'File uploaded', file });
      }
    });
  },
};
