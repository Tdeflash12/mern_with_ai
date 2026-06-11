import todoService from "../services/todoService";
import type { Request, Response } from "express";

const getTodos = async (_req: Request, res: Response) => {
  try {
    // debug: inspect service shape
    // eslint-disable-next-line no-console
    console.log("todoService keys:", Object.keys(todoService));
    // eslint-disable-next-line no-console
    console.log("getAll type:", typeof (todoService as any).getAll);
    const data = await (todoService as any).getAll();
    res.json(data);
  } catch (err) {
    res.status(500).send("Failed to get todos");
  }
};

const getOneTodo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data = await todoService.getOne(id);
    res.json(data);
  } catch (err) {
    res.status(500).send("Failed to get todo");
  }
};

const createTodo = async (req: Request, res: Response) => {
  try {
    const created = await todoService.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).send("Failed to create todo");
  }
};

export default { getTodos, getOneTodo, createTodo };
