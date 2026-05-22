import { PRODUCT_DESCRIPTION_PROMPT } from "../constants/prompt.js";
import { ADMIN } from "../constants/roles.js";
import Product from "../models/Product.js";
import uploadFile from "../utils/file.js";
import promptGemini from "../utils/gemini.js";
import type { Product as ProductType ,User} from "../types";
const ProductModel = Product as any;
type ProductQuery = {
  brands?: string | string[];
  category?: string;
  min?: string | number;
  max?: string | number;
  limit?: string | number;
  name?: string;
  offset?: string | number;
  createdBy?: string;
  sort?: string;
};

const getProducts = async (query: ProductQuery): Promise<ProductType[]> => {
  const { brands, category, min, max, limit, name, offset, createdBy, sort } = query;
  const filters: Record<string, unknown> = {};

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

  const products = await productQuery;
  return products;
};
const getProductById = async (id: string): Promise<ProductType> => {
  const product = await ProductModel.findById(id);
  if (!product) {
    throw {
      statusCode: 404,
      message: "Access denied",
    };
  }
  return product;
};
const createProduct = async (
  data: ProductType,
  files: any[],
  createdBy: string,
) => {
  const uploadedFiles = await uploadFile(files);
  const promptMessage = PRODUCT_DESCRIPTION_PROMPT.replace("%s", data.name)
    .replace("%s", data.brand ?? "")
    .replace("%s", data.category);
  const description = data.description ?? (await promptGemini(promptMessage));
  const imageUrls = uploadedFiles
    .map((items: { url?: string }) => items?.url)
    .filter((url): url is string => Boolean(url));
  const createdProduct = await ProductModel.create({
    ...data,
    createdBy,
    imageUrls,
    description,
  });
  return createdProduct;
};
const updateProduct = async (id: string, data: ProductType, files: any[], user: User) => {
  const product = await getProductById(id);

  if (product.createdBy != user._id && !user.roles.includes(ADMIN)) {
    throw {
      statusCode: 403,
      message: "Access denied",
    };
  }
  const updateData: ProductType & { imageUrls?: string[] } = { ...data };
  if (files && files.length > 0) {
    const uploadedFiles = await uploadFile(files);
    updateData.imageUrls = uploadedFiles
      .map((items: { url?: string }) => items?.url)
      .filter((url): url is string => Boolean(url));
  }
  const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return updatedProduct;
};
const deleteProduct = async (id: string, user: User ) => {
  const product = await getProductById(id);
  if (product.createdBy != user._id && !user.roles.includes(ADMIN)) {
    throw {
      statusCode: 403,
      message: "Access denied",
    };
  }
  await ProductModel.findByIdAndDelete(id);
};
export default { getProducts, getProductById, getProductByID: getProductById, createProduct, updateProduct, deleteProduct };
