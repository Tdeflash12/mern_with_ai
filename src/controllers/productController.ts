import productService from "../services/productService.js";
import type { Request, Response } from "express";
import type { User } from "../types/index.js";

type ProductRequest = Request & {
  files?: any;
  user?: User;
};

type ApiError = {
  statusCode?: number;
  message?: string;
};

const getUserId = (user?: User) => {
  if (!user || !user._id) {
    throw {
      statusCode: 401,
      message: "Access denied",
    };
  }

  return user._id;
};

const getErrorMessage = (error: unknown) => {
  if (error && typeof error === "object" && "message" in error) {
    return (error as ApiError).message || "Internal Server Error";
  }

  return "Internal Server Error";
};

const getStatusCode = (error: unknown) => {
  if (error && typeof error === "object" && "statusCode" in error) {
    return (error as ApiError).statusCode || 500;
  }

  return 500;
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getProducts(req.query);
    res.json(products);
  } catch (error) {
    res.status(getStatusCode(error)).send(getErrorMessage(error));
  }
};

const getProductByID = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    const product = await productService.getProductByID(id);
    res.json(product);
  } catch (error) {
    res.status(getStatusCode(error)).send(getErrorMessage(error));
  }
};

const createProduct = async (req: ProductRequest, res: Response) => {
  try {
    const data = await productService.createProduct(
      req.body,
      req.files ?? [],
      getUserId(req.user),
    );
    res.status(201).json(data);
  } catch (error) {
    res.status(getStatusCode(error)).send(getErrorMessage(error));
  }
};

const updateProduct = async (req: ProductRequest & Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    if (!req.user) return res.status(401).send("Unauthorized");
    const data = await productService.updateProduct(
      id,
      req.body,
      req.files ?? [],
      req.user,
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(getStatusCode(error)).send(getErrorMessage(error));
  }
};

const deleteProduct = async (req: ProductRequest & Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    if (!req.user) return res.status(401).send("Unauthorized");
    await productService.deleteProduct(id, req.user);
    res.send(`product successfully deleted with this id: ${id}`);
  } catch (error) {
    res.status(getStatusCode(error)).send(getErrorMessage(error));
  }
};

export default {
  getProducts,
  createProduct,
  getProductByID,
  updateProduct,
  deleteProduct,
};
