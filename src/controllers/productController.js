import productService from "../services/productService.js ";
const getProducts = (req, res) => {
  //request query
  const products = productService.getProducts(req.query);
  console.log(req.headers.cookie);

  res.status(error.statusCode || 500).json(products);
};
const getProductByID = async (req, res) => {
  //Request params

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
