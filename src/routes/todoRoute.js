import express from 'express';
import fs from 'fs';
const router =express.Router();
import todoController from '../controllers/todoController.js';

router.get("/",todoController.getTodos);
router.get("/one",todoController.getOneTodo);
router.post("/",todoController.createTodo);
export default router;