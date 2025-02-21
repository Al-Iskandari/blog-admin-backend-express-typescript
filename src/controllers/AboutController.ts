import { Request, Response } from 'express';

import { About } from '../models';
import Helper from '../helpers/Helper';


const getAllAbouts = async (req: Request, res: Response) => {
    try {
        const abouts = await About.findAll();
        res.status(200).send(Helper.ResponseData(200, 'Found', null, abouts));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error fetching abouts', error, null));
        return;
    }
}

const getAboutById = async (req: Request, res: Response) => {
    try {
        const about = await About.findByPk(req.params.id);

        if (!about) {
            res.status(404).send(Helper.ResponseData(404, 'About not found', null, null));
            return;
        }

        res.status(200).send(Helper.ResponseData(200, 'Found', null, about));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error fetching about', error, null));
        return;
    }
}

const createAbout = async (req: Request, res: Response) => {
    try {
        const about = await About.create(req.body);
        res.status(201).send(Helper.ResponseData(201, 'About created', null, about));
        return;
    } catch (error) {
        res.status(400).send(Helper.ResponseData(400, 'Error creating about', error, null));
        return;
    }
}

const updateAbout = async (req: Request, res: Response) => {
    try {
        const about = await About.findByPk(req.params.id);

        if (!about) {
            res.status(404).send(Helper.ResponseData(404, 'About not found', null, null));
            return;
        }

        await about.update(req.body);
        res.status(200).send(Helper.ResponseData(200, 'About updated', null, about));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error updating about', error, null));
        return;
    }
}

const deleteAbout = async (req: Request, res: Response) => {
    try {
        const about = await About.findByPk(req.params.id);

        if (!about) {
            res.status(404).send(Helper.ResponseData(404, 'About not found', null, null));
            return;
        }

        await about.destroy();
        res.status(204).send(Helper.ResponseData(204, 'About deleted', null, null));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error deleting about', error, null));
        return;
    }
}

export default { getAllAbouts, getAboutById, createAbout, updateAbout, deleteAbout };