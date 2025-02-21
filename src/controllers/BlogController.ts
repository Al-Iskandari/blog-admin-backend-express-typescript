import { Request, Response } from 'express';

import { Blog } from '../models';
import Helper from '../helpers/Helper';



const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.findAll();
        res.status(200).send(Helper.ResponseData(200, 'Found', null, blogs));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error fetching blogs', error, null));
        return;
    }
};

const getBlogById = async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findByPk(req.params.id);

        if (!blog) {
            res.status(404).send(Helper.ResponseData(404, 'Blog not found', null, null));
            return;
        }

        res.status(200).send(Helper.ResponseData(200, 'Found', null, blog));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error fetching blog', error, null));
        return;
    }
};

const createBlog = async (req: Request, res: Response) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(201).send(Helper.ResponseData(201, 'Blog created', null, blog));
        return;
    } catch (error) {
        res.status(400).send(Helper.ResponseData(400, 'Error creating blog', error, null));
        return;
    }
};

const updateBlog = async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findByPk(req.params.id);

        if (!blog) {
            res.status(404).send(Helper.ResponseData(404, 'Blog not found', null, null));
            return;
        }

        await blog.update(req.body);
        res.status(200).send(Helper.ResponseData(200, 'Blog updated', null, blog));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error updating blog', error, null));
        return;
    }
};

const deleteBlog = async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findByPk(req.params.id);

        if (!blog) {
            res.status(404).send(Helper.ResponseData(404, 'Blog not found', null, null));
            return;
        }

        await blog.destroy();
        res.status(204).send(Helper.ResponseData(204, 'Blog deleted', null, null));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error deleting blog', error, null));
        return;
    }
};

export default { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog };

