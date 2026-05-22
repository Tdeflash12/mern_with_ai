import productService from "../services/productService.js";

const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts(req.query);
    res.json(products);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getProductByID = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productService.getProductByID(id);
    res.json(product);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const data = await productService.createProduct(
      req.body,
      req.files,
      req.user._id,
    );
    res.status(201).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await productService.updateProduct(
      id,
      req.body,
      req.files,
      req.user,
    );
    res.status(201).send(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  try {
    await productService.deleteProduct(id, user._id);
    res.send(`product successfully deleted with this id: ${id}`);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

export default {
  getProducts,
  createProduct,
  getProductByID,
  updateProduct,
  deleteProduct,
};
