import { Request, Response, NextFunction } from "express";
import sharp from "sharp";
import Helper from "../../helpers/Helper";
import path from "path";
export default async (err: { code: any; }, req: Request, res:Response, next: NextFunction) => {
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
      
      
  };