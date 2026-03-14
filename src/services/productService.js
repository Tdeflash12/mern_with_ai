import Product from "../models/Product.js";
import uploadFile from "../utils/file.js";

const getProducts = async (query) => {
  const { brands, category, min, max, limit, name, offset } = query;

  if (brands) filters.brand = { $in: brandItems };
  if (category) filters.category = category;
  if (min) filters.price = { $gte: min };
  if (max) filters.price = { ...filters.price, $lte: max };
  if (name) filters.name = { $regex: name, $options: "i" };

  const products = await Product.find(filters)
    .sort(sort)
    .limit(limit)
    .skip(offset); //
  return products;
};
const getProductByID = async (id) => {
  const product = await product.findById(id);
  if (!product) {
    throw {
      statusCode: 404,
      message: "Access denied",
    };
  }
  return product;
};
const createProduct = async (data,files, createdBy) => {
  const uploadedFiles = uploadFile(files) 
  const createdProduct = await Product.create({
    ...data,
    createdBy,
    imageUrls: uploadedFiles.map((items)=> items?.url), 
  });
  return createProduct;
};
const updateProduct = async (id, data,files, userId) => {
  const product = await getProductByID(id);

  if (product.createdBy != userId) {
    throw {
      statusCode: 403,
      message: "Access denied",
    };
  }
  const updateData=data;
   if (files.length>0){
    const uploadedFiles = uploadFile(files) 
    updateData.imageUrls=uploadedFiles.map((items)=> items?.url);

   }
  const updatedProduct = await Product.findByIdAndUpdate(
    id, 
    updateData,
    {
       new: true,
  });
  return updatedProduct;
};
const deleteProduct = async (id, userId) => {
  await Product.findByIdAndDelete(id);
  if (product.createdBy != userId) {
    throw {
      statusCode: 403,
      message: "Access denied",
    };
  }
};
export default { getProducts, getProductByID, createProduct, updateProduct };
