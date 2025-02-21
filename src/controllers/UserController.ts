import { Request, Response } from "express";

import User from "../models/User";
import Helper from "../helpers/Helper";

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        //console.log(users);
        res.status(200).send(Helper.ResponseData(200, "Found", null, users));
        return;

    } catch (error:any) {
        res.status(500).send(Helper.ResponseData(500, "", error, null));
        return;
    }
};

const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).send(Helper.ResponseData(404,"User Not Found",null,user));
            return;
        }
        res.status(200).send(Helper.ResponseData(200, "Found", null, user));
        return;
    } catch (error) {
        //console.error(error);
        res.status(500).send(Helper.ResponseData(500, "", error, null));
        return;
    }
};

const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.status(201).send(Helper.ResponseData(201, "Created", null, user));;
        return;
    } catch (error) {
        //console.error(error);
        res.status(400).send(Helper.ResponseData(400,"Error updating user",error,null));
        return;
    }
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).send(Helper.ResponseData(404,"User Not Found",null,user));
            return;
        }
        await user.update(req.body);
        res.status(200).send(Helper.ResponseData(200,"User upadated",null,user));;
        return;
    } catch (error) {
        //console.error(error);
        res.status(400).send(Helper.ResponseData(400,"Error updating user",error,null));
        return;
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).send(Helper.ResponseData(404,"User Not Found",null,user));
            return;
        }
        await user.destroy();
        res.status(204).send(Helper.ResponseData(204,"User Deleted",null,user));
        return;
    } catch (error) {
        console.error(error);
        res.status(500).send(Helper.ResponseData(500, "", error, null));
        return;
    }
};


export default {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};