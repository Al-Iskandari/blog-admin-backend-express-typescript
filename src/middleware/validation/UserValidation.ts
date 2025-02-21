import Validator from "validatorjs";
import { Request, Response, NextFunction } from "express";
import Helper from "../../helpers/Helper";
import User from "../../models/User";

const ValidateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {firstName,lastName,email} = req.body;

        const data = {
            firstName,
            lastName,
            email,
        };

        const rules = {
            firstName: "required|string|max:25",
            lastName: "required|string|max:25",
            email: "required|email",
        };

        const validation = new Validator(data, rules);

        if (validation.fails()) {
            res.status(400).send(Helper.ResponseData(400, "Validation Failed", validation.errors.all(), null));
            return;
        }

        const user = await User.findOne({
            where: {
                email:data.email
            },
        });

        if (user) {
            res.status(400).send(Helper.ResponseData(400,"Bad Request","Email already exists",null));
            return;
        }

        next();
    } catch (error:any) {
        res.status(500).send(Helper.ResponseData(500,"",error,null));
        return;
    }
    
};

export default { ValidateUser };