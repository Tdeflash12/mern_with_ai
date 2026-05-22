import { PRODUCT_DESCRIPTION_PROMPT } from "../constants/prompt.js";
import { ADMIN } from "../constants/roles.js";
import Product from "../models/Product.js";
import uploadFile from "../utils/file.js";
import promptGemini from "../utils/gemini.js";

const ProductModel = Product;

const getProducts = async (query) => {
  const { brands, category, min, max, limit, name, offset, createdBy, sort } = query;
  const filters = {};

  if (brands) {
    const brandItems = Array.isArray(brands)
      ? brands
      : brands.split(",").map((brand) => brand.trim()).filter(Boolean);
    filters.brand = { $in: brandItems };
  }
  if (category) filters.category = category;
  if (min !== undefined || max !== undefined) {
    filters.price = {
      ...(min !== undefined ? { $gte: Number(min) } : {}),
      ...(max !== undefined ? { $lte: Number(max) } : {}),
    };
  }
  if (name) filters.name = { $regex: name, $options: "i" };
  if (createdBy) filters.createdBy = createdBy;

  let productQuery = ProductModel.find(filters).sort(sort ?? "-createdAt");
  if (limit !== undefined) productQuery = productQuery.limit(Number(limit));
  if (offset !== undefined) productQuery = productQuery.skip(Number(offset));

  return await productQuery;
};

const getProductById = async (id) => {
  const product = await ProductModel.findById(id);
  if (!product) {
    throw {
      statusCode: 404,
      message: "Access denied",
    };
  }
  return product;
};

const createProduct = async (data, files, createdBy) => {
  const uploadedFiles = await uploadFile(files);
  const promptMessage = PRODUCT_DESCRIPTION_PROMPT.replace("%s", data.name)
    .replace("%s", data.brand ?? "")
    .replace("%s", data.category);
  const description = data.description ?? (await promptGemini(promptMessage));
  const imageUrls = uploadedFiles
    .map((items) => items?.url)
    .filter((url) => Boolean(url));

  return await ProductModel.create({
    ...data,
    createdBy,
    imageUrls,
    description,
  });
};

const updateProduct = async (id, data, files, user) => {
  const product = await getProductById(id);

  if (product.createdBy != user._id && !user.roles.includes(ADMIN)) {
    throw {
      statusCode: 403,
      message: "Access denied",
    };
  }

  const updateData = { ...data };
  if (files && files.length > 0) {
    const uploadedFiles = await uploadFile(files);
    updateData.imageUrls = uploadedFiles
      .map((items) => items?.url)
      .filter((url) => Boolean(url));
  }

  return await ProductModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
};

const deleteProduct = async (id, user) => {
  const product = await getProductById(id);
  if (product.createdBy != user._id && !user.roles.includes(ADMIN)) {
    throw {
      statusCode: 403,
      message: "Access denied",
    };
  }
  await ProductModel.findByIdAndDelete(id);
};

export default {
  getProducts,
  getProductById,
  getProductByID: getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};