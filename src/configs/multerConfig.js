import multer from "multer";

const storageConfig = multer.diskStorage({
  filename: (req, file, res) => {
    res(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilterConfig = function (req, file, cb) {
  if (
    file.mimetype === "application/msword" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const upload = multer({
  storage: storageConfig,
  fileFilter: fileFilterConfig,
});
