import fs, { readFileSync } from "fs";
import Product from "../models/Product.js";

const getProducts = async (query) => {
  const products = await Product.find();
  return products;
};
const getProductByID = async (id) => {
  const product = await product.findById(id);
  return product;
};
const createProduct = async (data) => {
  const createdProduct = await Product.create(data);
  return createProduct;
};
const updateProduct = async (id, data) => {
  const updatedProduct = await Product.findByIdAndUpdate(id, data,{
    new:true,
  });
  return updatedProduct;
};
const deleteProduct = async (id)=>{
  await Product.findByIdAndDelete(id);
}
export default { getProducts, getProductByID, createProduct,updateProduct };
