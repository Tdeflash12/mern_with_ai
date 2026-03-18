 import express from "express"
import userController from "../controllers/userController.js";
import roleBasedAuth from "../middleware/roleBasedAuth.js";

 const router = express.Router();
// URL : /api/users
 router.post("/",userController.createUser );
 router.get("/",userController.getUsers);
 router.get("/:id",userController.getUserById);
 router.put("/:id",userController.updateUser);
 router.delete("/:id",userController.deleteUser);
 router.patch("/:id/profile-image",userController.updateProfileImage);


 export default router;

 