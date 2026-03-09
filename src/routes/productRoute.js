import express from "express";


import productController from "../controllers/productController.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/",productController.getProducts); 

router.get("/:id", productController.getProductByID);
router.post("/", auth, productController.createProduct )

router.put("/:id",auth,productController.updateProduct); 
router.delete("/",auth,productController.deleteProduct); 


export default router;
 