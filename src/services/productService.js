import Product from "../models/Product.js";

const getProducts = async (query) => {
  const products = await Product.find().populate("createdBy");
  return products;
};
const getProductByID = async (id) => {
  const product = await product.findById(id);
  if(product.createdBy!= userId){
     throw{
      statusCode:403,
      message :"Access denied",
    }
  }
  return product;
};
const createProduct = async (data,username ) => {
  const createdProduct = await Product.create({
    ...data,
    createdBy});
  return createProduct;
};
const updateProduct = async (id, data,userId) => {
  const product=await getProductByID(id);
 
  if(product.createdBy!= userId){
     throw{
      statusCode:403,
      message :"Access denied",
    }
  }
  const updatedProduct = await Product.findByIdAndUpdate(id, data,{
    new:true,
  });
  return updatedProduct;
};
const deleteProduct = async (id,userId)=>{
  await Product.findByIdAndDelete(id);
  if(product.createdBy!= userId){
     throw{
      statusCode:403,
      message :"Access denied",
    }
  }
}
export default { getProducts, getProductByID, createProduct,updateProduct };
