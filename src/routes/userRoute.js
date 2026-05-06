import express from "express";
import userController from "../controllers/userController.js";
import roleBasedAuth from "../middleware/roleBasedAuth.js";
import { ADMIN } from "../constants/roles.js";

const router = express.Router();
// URL : /api/users
router.post("/", roleBasedAuth(ADMIN), userController.createUser);
router.get("/", roleBasedAuth(ADMIN), userController.getUsers);
router.get("/:id", roleBasedAuth(ADMIN), userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/:id/profile-image", userController.updateProfileImage);
router.post("/merchant",roleBasedAuth(ADMIN), userController.createMerchant);

export default router;
