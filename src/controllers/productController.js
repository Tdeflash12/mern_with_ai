import fs, { readFileSync } from "fs";
import productService from "../services/productService.js ";
const getProducts = (req, res) => {
  //request query

  const products = productService.getProducts(req.query);

  res.status(500).json(products);
};
const getProductByID = (req, res) => {
  //Request params
  const id = req.params.id;

  const product = productService.getProductByID(id);

  res.json(product);

  res.send(`product of id :${id}`);
};
const createProduct = (req, res) => {
  productService.createProduct(req.body);
  res.status(201).send("product created Successfully");
};
const updateProduct = (req, res) => {
  res.send("One product fetched");
};
const deleteProduct = (req, res) => {
  res.send("Product deleted");
};
export default {
  getProducts,
  createProduct,
  getProductByID,
  updateProduct,
  deleteProduct,
};
