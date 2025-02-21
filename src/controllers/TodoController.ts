import { Request, Response } from 'express';

import { Todo } from '../models';
import Helper from '../helpers/Helper';


const getAllTodos = async (req: Request, res: Response) => {
    try {
        const todos = await Todo.findAll();
        res.status(200).send(Helper.ResponseData(200, 'Found', null, todos));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error fetching todos', error, null));
        return;
    }
};

const getTodoById = async (req: Request, res: Response) => {
    try {
        const todo = await Todo.findByPk(req.params.id);

        if (!todo) {
            res.status(404).send(Helper.ResponseData(404, 'Todo not found', null, null));
            return;
        }

        res.status(200).send(Helper.ResponseData(200, 'Found', null, todo));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error fetching todo', error, null));
        return;
    }
};

const createTodo = async (req: Request, res: Response) => {
    try {
        const todo = await Todo.create(req.body);
        res.status(201).send(Helper.ResponseData(201, 'Todo created', null, todo));
        return;
    } catch (error) {
        res.status(400).send(Helper.ResponseData(400, 'Error creating todo', error, null));
        return;
    }
};

const updateTodo = async (req: Request, res: Response) => {
    try {
        const todo = await Todo.findByPk(req.params.id);

        if (!todo) {
            res.status(404).send(Helper.ResponseData(404, 'Todo not found', null, null));
            return;
        }

        await todo.update(req.body);
        res.status(200).send(Helper.ResponseData(200, 'Todo updated', null, todo));
        return;
    } catch (error) {
        res.status(400).send(Helper.ResponseData(400, 'Error updating todo', error, null));
        return;
    }
};

const deleteTodo = async (req: Request, res: Response) => {
    try {
        const todo = await Todo.findByPk(req.params.id);

        if (!todo) {
            res.status(404).send(Helper.ResponseData(404, 'Todo not found', null, null));
            return;
        }

        await todo.destroy();
        res.status(200).send(Helper.ResponseData(200, 'Todo deleted', null, null));
        return;
    } catch (error) {
        res.status(500).send(Helper.ResponseData(500, 'Error deleting todo', error, null));
        return;
    }
};

export default { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo };
