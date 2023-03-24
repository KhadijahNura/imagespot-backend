import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (_, file, cb) {
    const date = Date.now();
    cb(null, date + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/svg+xml'
  ) {
    cb(null, true);
  } else {
    // reject the file
    cb({ message: 'Unsupported file format' }, false);
  }
};

export const upload = multer({
  storage: storage,
  // file must be less than or equal to 10mb in size
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: fileFilter,
});
