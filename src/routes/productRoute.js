import express from "express";


import productController from "../controllers/productController.js";

const router = express.Router();
router.get("/",productController.getProducts); 

router.get("/:id", productController.getProductByID);
router.post("/",productController.createProduct )

router.put("/:id",productController.updateProduct); 
router.delete("/",productController.deleteProduct); 


export default router;
 