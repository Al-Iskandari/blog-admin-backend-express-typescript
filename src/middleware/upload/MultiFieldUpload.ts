import { Request, Response, NextFunction } from "express";
import multer, { MulterError } from "multer";
import path from "path";
import sharp from "sharp";
import Helper from "../../helpers/Helper";
import upload from "../../config/MulterConfig";

const uploadFiles = upload.fields([
    { name: 'product_image', maxCount: 1 },
    { name: 'customer_image', maxCount: 1 }
   ]);

export default (req: Request, res: Response, next: NextFunction) => {
  uploadFiles(req, res, async err => {
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
        if(!req.files){
            res.status(400).send(Helper.ResponseData(400,"Something wrong, can not upload your file.","Your files is not found.",null));
            return;
        }
        
        const saveTo = path.resolve(__dirname, "../../../public/static", "images/thumb");
            if(req.files){
                for (const file of Object.values(req?.files)) {
                    //console.log(file[0].fieldname);
                    const filePath = path.join(saveTo, file[0].filename);
                    await sharp(file[0].path)
                        .resize({ width: 300, height: 300, fit:'inside' })
                        .png({ quality: 80 })
                        .toFile(filePath);
                    if (file[0].fieldname==='product_image') {
                        req.body.product_image=file[0].filename;
                    }else{
                        req.body.customer_image=file[0].filename;
                    }
                }
                next();
            }
      } catch (err : any) {
        res.status(400).send(Helper.ResponseData(400, 'Can not fulfill your request due to some errors', err.message, null));
        return;
      }
    });
}