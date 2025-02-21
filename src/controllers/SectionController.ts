import { Request, Response } from 'express';

import { Section } from '../models';
import Helper from '../helpers/Helper';


const getAllSections = async (req: Request, res: Response) => {
    try {
        const sections = await Section.findAll();
        res.status(200).send(Helper.ResponseData(200, 'Found', null, sections));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error fetching sections', error, null));
        return;
    }
}

const getSectionById = async (req: Request, res: Response) => {
    try {
        const section = await Section.findByPk(req.params.id);

        if (!section) {
            res.status(404).send(Helper.ResponseData(404, 'Section not found', null, null));
            return;
        }

        res.status(200).send(Helper.ResponseData(200, 'Found', null, section));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error fetching section', error, null));
        return;
    }
}

const createSection = async (req: Request, res: Response) => {
    try {
        const section = await Section.create(req.body);
        res.status(201).send(Helper.ResponseData(201, 'Section created', null, section));
        return;
    } catch (error) {
        res.status(400).send(Helper.ResponseData(400, 'Error creating section', error, null));
        return;
    }
}

const updateSection = async (req: Request, res: Response) => {
    try {
        const section = await Section.findByPk(req.params.id);

        if (!section) {
            res.status(404).send(Helper.ResponseData(404, 'Section not found', null, null));
            return;
        }

        await section.update(req.body);
        res.status(200).send(Helper.ResponseData(200, 'Section updated', null, section));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error updating section', error, null));
        return;
    }
}

const deleteSection = async (req: Request, res: Response) => {
    try {
        const section = await Section.findByPk(req.params.id);

        if (!section) {
            res.status(404).send(Helper.ResponseData(404, 'Section not found', null, null));
            return;
        }

        await section.destroy();
        res.status(204).send(Helper.ResponseData(204, 'Section deleted', null, null));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error deleting section', error, null));
        return;
    }
}

export default { getAllSections, getSectionById, createSection, updateSection, deleteSection };