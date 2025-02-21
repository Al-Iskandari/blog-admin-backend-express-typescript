import { Request, Response } from "express";

import Gallery from "../models/Gallery";
import Helper from "../helpers/Helper";

const getGalleries = async (req: Request, res: Response) => {
    try {
        const galleries = await Gallery.findAll();
        //console.log(galleries);
        res.status(200).send(Helper.ResponseData(200, "Found", null, galleries));
        return;

    } catch (error:any) {
        res.status(500).send(Helper.ResponseData(500, "", error, null));
        return;
    }
};

const getGalleryById = async (req: Request, res: Response) => {
    try {
        const gallery = await Gallery.findByPk(req.params.id);
        if (!gallery) {
            res.status(404).send(Helper.ResponseData(404,"Gallery Not Found",null,gallery));
            return;
        }
        res.status(200).send(Helper.ResponseData(200, "Found", null, gallery));
        return;
    } catch (error) {
        //console.error(error);
        res.status(500).send(Helper.ResponseData(500, "", error, null));
        return;
    }
};

const createGallery = async (req: Request, res: Response) => {
    try {
        //console.log(req.body);
        const gallery = await Gallery.create(req.body);
        res.status(201).send(Helper.ResponseData(201, "Created", null, gallery));;
        return;
    } catch (error) {
        //console.error(error);
        res.status(400).send(Helper.ResponseData(400,"Error updating gallery",error,null));
        return;
    }
};

const updateGallery = async (req: Request, res: Response) => {
    try {
        const gallery = await Gallery.findByPk(req.params.id);
        if (!gallery) {
            res.status(404).send(Helper.ResponseData(404,"Gallery Not Found",null,gallery));
            return;
        }
        await gallery.update(req.body);
        res.status(200).send(Helper.ResponseData(200,"Gallery upadated",null,gallery));;
        return;
    } catch (error) {
        //console.error(error);
        res.status(400).send(Helper.ResponseData(400,"Error updating gallery",error,null));
        return;
    }
};

const deleteGallery = async (req: Request, res: Response) => {
    try {
        const gallery = await Gallery.findByPk(req.params.id);
        if (!gallery) {
            res.status(404).send(Helper.ResponseData(404,"Gallery Not Found",null,gallery));
            return;
        }
        await gallery.destroy();
        res.status(204).send(Helper.ResponseData(204,"Gallery Deleted",null,gallery));
        return;
    } catch (error) {
        //console.error(error);
        res.status(500).send(Helper.ResponseData(500,"",error,null));
        return;
    }
};

export default {
    getGalleries,
    getGalleryById,
    createGallery,
    updateGallery,
    deleteGallery,
};