import { Request, Response, NextFunction } from "express";
import multer, { MulterError } from "multer";
import path from "path";
import sharp from "sharp";
import Helper from "../../helpers/Helper";
import upload from "../../config/MulterConfig";

const uploadFile = upload.single('image');

export default (req: Request, res: Response, next: NextFunction) => {
  uploadFile(req, res, async err => {
      if (err) {
        try {
          switch (err.code) {
            case "LIMIT_UNEXPECTED_FILE":
              throw new Error("Invalid file type! Only PNG and JPEG are allowed");
  
            case "LIMIT_FILE_SIZE":
              throw new Error("File size is too large! Max size is 2MB");
  
            default:
              throw new Error("Something went wrong!");
          }
        } catch (err : any) {
          res.status(400).send(Helper.ResponseData(400,"Something wrong, can not upload your file.",err.message,null));
          return;
        }
      }

      try {
        let filename=''
        if (req.file) {
          const extension = path.extname(req.file.originalname);
          filename = req.file.filename;
        } else {
          res.status(400).send(Helper.ResponseData(400, "Something wrong, can not upload your file.", "File is missing", null));
          return;
        }
        const saveTo = path.resolve(__dirname, "../../../public/static", "images/thumb");
        const filePath = path.join(saveTo, filename);
  
        await sharp(req.file?.path)
          .resize({ width: 300, height: 300, fit:'inside' })
          .png({ quality: 80 })
          .toFile(filePath);
  
        req.body.image = filename;
  
        next();
      } catch (err : any) {
        res.status(400).send(Helper.ResponseData(400, 'Can not fulfill your request due to some errors', err.message, null));
        return;
      }
    });
}