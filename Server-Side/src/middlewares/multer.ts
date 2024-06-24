const multer = require("multer");

const storage = multer.diskStorage({
  fileName: function (req: Request, file: any, cb: any) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
