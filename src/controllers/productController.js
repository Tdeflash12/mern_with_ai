import fs, { readFileSync } from "fs";
import productService from "../services/productService.js ";
const getProducts = (req, res) => { 
    const products = productService.getProducts();
  
  res.status(500).json(products)
};
const getProductByID=(req, res) => {
  res.send("Product by Id 1");
}
const createProduct = (req, res) => { 
  res.send("Create a product");
};
const updateProduct =(req, res) => {
  res.send("One product fetched");
}
const deleteProduct=(req,res)=>{
    res.send("Product deleted");
}
export default {getProducts,createProduct,getProductByID,updateProduct,deleteProduct}