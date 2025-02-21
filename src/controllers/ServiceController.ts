import { Request, Response } from 'express';

import { Service } from '../models';
import Helper from '../helpers/Helper';


const getAllServices = async (req: Request, res: Response) => {
    try {
        const servicec = await Service.findAll();
        res.status(200).send(Helper.ResponseData(200, 'Found', null, servicec));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error fetching servicec', error, null));
        return;
    }
}

const getServiceById = async (req: Request, res: Response) => {
    try {
        const service = await Service.findByPk(req.params.id);

        if (!service) {
            res.status(404).send(Helper.ResponseData(404, 'Service not found', null, null));
            return;
        }

        res.status(200).send(Helper.ResponseData(200, 'Found', null, service));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error fetching service', error, null));
        return;
    }
}

const createService = async (req: Request, res: Response) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).send(Helper.ResponseData(201, 'Service created', null, service));
        return;
    } catch (error) {
        res.status(400).send(Helper.ResponseData(400, 'Error creating service', error, null));
        return;
    }
}

const updateService = async (req: Request, res: Response) => {
    try {
        const service = await Service.findByPk(req.params.id);

        if (!service) {
            res.status(404).send(Helper.ResponseData(404, 'Service not found', null, null));
            return;
        }

        await service.update(req.body);
        res.status(200).send(Helper.ResponseData(200, 'Service updated', null, service));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error updating service', error, null));
        return;
    }
}

const deleteService = async (req: Request, res: Response) => {
    try {
        const service = await Service.findByPk(req.params.id);

        if (!service) {
            res.status(404).send(Helper.ResponseData(404, 'Service not found', null, null));
            return;
        }

        await service.destroy();
        res.status(204).send(Helper.ResponseData(204, 'Service deleted', null, null));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error deleting service', error, null));
        return;
    }
}

export default { getAllServices, getServiceById, createService, updateService, deleteService };