import multer from "multer";
import path from "path";
// *******HANDLING THE FILES********
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/static/images"));
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const filename = `${new Date().toISOString().replace(/:/g, "-")}-ayuna${extension}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("LIMIT_UNEXPECTED_FILE"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 2, // 2MB file size limit
  },
});

export default upload;