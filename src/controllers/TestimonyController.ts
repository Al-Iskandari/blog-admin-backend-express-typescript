import { Request, Response } from 'express';

import { Testimony } from '../models';
import Helper from '../helpers/Helper';


const getAllTestimonys = async (req: Request, res: Response) => {
    try {
        const testimonys = await Testimony.findAll();
        res.status(200).send(Helper.ResponseData(200, 'Found', null, testimonys));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error fetching testimonys', error, null));
        return;
    }
}

const getTestimonyById = async (req: Request, res: Response) => {
    try {
        const testimony = await Testimony.findByPk(req.params.id);

        if (!testimony) {
            res.status(404).send(Helper.ResponseData(404, 'Testimony not found', null, null));
            return;
        }

        res.status(200).send(Helper.ResponseData(200, 'Found', null, testimony));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error fetching testimony', error, null));
        return;
    }
}

const createTestimony = async (req: Request, res: Response) => {
    try {
        const testimony = await Testimony.create(req.body);
        res.status(201).send(Helper.ResponseData(201, 'Testimony created', null, testimony));
        return;
    } catch (error) {
        res.status(400).send(Helper.ResponseData(400, 'Error creating testimony', error, null));
        return;
    }
}

const updateTestimony = async (req: Request, res: Response) => {
    try {
        const testimony = await Testimony.findByPk(req.params.id);

        if (!testimony) {
            res.status(404).send(Helper.ResponseData(404, 'Testimony not found', null, null));
            return;
        }

        await testimony.update(req.body);
        res.status(200).send(Helper.ResponseData(200, 'Testimony updated', null, testimony));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error updating testimony', error, null));
        return;
    }
}

const deleteTestimony = async (req: Request, res: Response) => {
    try {
        const testimony = await Testimony.findByPk(req.params.id);

        if (!testimony) {
            res.status(404).send(Helper.ResponseData(404, 'Testimony not found', null, null));
            return;
        }

        await testimony.destroy();
        res.status(204).send(Helper.ResponseData(204, 'Testimony deleted', null, null));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error deleting testimony', error, null));
        return;
    }
}

export default { getAllTestimonys, getTestimonyById, createTestimony, updateTestimony, deleteTestimony };