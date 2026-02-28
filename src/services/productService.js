import fs, {readFileSync} from "fs";
const getProducts =()=>{
    const rawData = readFileSync("./src/data/products.json", "utf-8");
  const products = JSON.parse(rawData);
  const filteredProducts = products.filter((products) => products.price < 300);
  return filteredProducts; 
}
export default {getProducts}