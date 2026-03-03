import fs, { readFileSync } from "fs";
import productService from "../services/productService.js ";
const getProducts = (req, res) => {
  //request query

  const products = productService.getProducts(req.query);

  res.status(500).json(products);
};
const getProductByID = async(req, res) => {
  //Request params
  const id = req.params.id;

  const product = await  productService.getProductByID(id);

  res.json(product);

  res.send(`product of id :${id}`);
};
const createProduct = async(req, res) => {
  try {
    const data =await productService.createProduct(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).send(error.message);
    
  }
  
};
const updateProduct = async(req, res) => {
  const id = req.params.id;
try {
   const data =await  productService.updateProduct(id,req.body)
  res.status(201).send(data ) 
} catch (error) {
     res.status(500).send(error.message);
}
};
const deleteProduct = async(req, res) => {
  const id =req.params.id;
try {
   await productService.deleteProduct(id); 
   res.send(`product successfully deleted with this id: ${id}`);
} catch (error) {
  res.status(500).send(error.message);
}
};
export default {
  getProducts,
  createProduct,
  getProductByID,
  updateProduct,
  deleteProduct,
};
