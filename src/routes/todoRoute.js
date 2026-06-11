import express from 'express';
import fs from 'fs';
const router =express.Router();
import todoController from '../controllers/todoController.js';

router.get("/",todoController.getTodos);
router.get("/one",todoController.getOneTodo);
router.get("/debug", (_req, res) => res.json([1, 2, 3]));
router.post("/",todoController.createTodo);
export default router;