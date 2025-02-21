import jwt from "jsonwebtoken";
import express from "express";
import dotenv from "dotenv";
import Helper from "../helpers/Helper";

dotenv.config();
export default function JwtAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
    const token = req.header('Authorization');
    if (!token){
        res.status(401).send(Helper.ResponseData(401,'You are not an authorized user','unauthorized',null));
        return;
    }

    if(token.startsWith('Bearer')==false){
        res.status(401).send(Helper.ResponseData(401,'Invalid token','unauthorized',null));
        return;
    }

    const jwtToken = token.slice(7, token.length);
    try {
        const decoded = jwt.verify(jwtToken,process.env.JWT_SECRET as string || '');
        req.user = decoded;
    } catch (error) {
        res.status(401).send(Helper.ResponseData(401,'Invalid token','unauthorized',null));
        return;
        
    }
    next();
}