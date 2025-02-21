import { Request, Response } from 'express';

import { Project } from '../models';
import Helper from '../helpers/Helper';

const getAllProjects = async (req : Request, res: Response) => {
    try {
        const projects = await Project.findAll();
        res.status(200).send(Helper.ResponseData(200, 'Found', null, projects));
        return; 
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error fetching projects', error, null));
        return;
    }
}

const getProjectById = async (req: Request, res: Response) => {
    try {
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            res.status(404).send(Helper.ResponseData(404, 'Project not found', null, null));
            return;
        }

        res.status(200).send(Helper.ResponseData(200, 'Found', null, project));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error fetching project', error, null));
        return;
    }
}

const createProject = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const project = await Project.create(req.body);
        res.status(201).send(Helper.ResponseData(201, 'Project created', null, project));
        return;
    } catch (error) {
        res.status(400).send(Helper.ResponseData(400, 'Error creating project', error, null));
        return;
    }
}

const updateProject = async (req: Request, res: Response) => {
    try {
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            res.status(404).send(Helper.ResponseData(404, 'Project not found', null, null));
            return;
        }

        await project.update(req.body);
        res.status(200).send(Helper.ResponseData(200, 'Project updated', null, project));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error updating project', error, null));
        return;
    }
}

const deleteProject = async (req: Request, res: Response) => {
    try {
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            res.status(404).send(Helper.ResponseData(404, 'Project not found', null, null));
            return;
        }

        await project.destroy();
        res.status(200).send(Helper.ResponseData(200, 'Project deleted', null, null));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error deleting project', error, null));
        return;
    }
}

export default { getAllProjects, getProjectById, createProject, updateProject, deleteProject };