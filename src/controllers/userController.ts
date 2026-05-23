import userService from "../services/userService.js";
import type { Request, Response } from "express";
import type { User } from "../types/index.js";

type UserRequest = Request & { user?: User; file?: any };

const createUser = async (req: Request, res: Response) => {
  try {
    const data = await userService.createUser(req.body);
    res.status(201).json(data);
  } catch (error: any) {
    res.status(error?.statusCode || 500).send(error?.message || "Failed");
  }
};

const getUsers = async (_req: Request, res: Response) => {
  try {
    const data = await userService.getUsers();
    res.json(data);
  } catch (error: any) {
    res.status(error?.statusCode || 500).send(error?.message || "Failed");
  }
};

const getUserById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    const data = await userService.getUserById(id);
    res.json(data);
  } catch (error: any) {
    res.status(error?.statusCode || 500).send(error?.message || "Failed");
  }
};

const updateUser = async (req: UserRequest & Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    const data = await userService.updateUser(id, req.body, req.user);
    res.status(201).json(data);
  } catch (error: any) {
    res.status(error?.statusCode || 500).send(error?.message || "Failed");
  }
};

const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    await userService.deleteUser(id);
    res.send(`User deleted Successfully with id : ${id}`);
  } catch (error: any) {
    res.status(error?.statusCode || 500).send(error?.message || "Failed");
  }
};

const updateProfileImage = async (req: UserRequest & Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    const file = req.file;
    const data = await userService.updateProfileImage(id, file, req.user);
    res.json(data);
  } catch (error: any) {
    res.status(error?.statusCode || 500).send(error?.message || "Failed");
  }
};

const createMerchant = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId as string | undefined;
    if (!userId) return res.status(400).send("Merchant id is required.");
    const data = await userService.createMerchant(userId);
    res.json(data);
  } catch (error: any) {
    res.status(error?.statusCode || 500).send(error?.message || "Failed");
  }
};

export default {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateProfileImage,
  createMerchant,
};
