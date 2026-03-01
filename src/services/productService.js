import fs, {readFileSync} from "fs";
 const rawData = readFileSync("./src/data/products.json", "utf-8");
  const products = JSON.parse(rawData);
const getProducts =(query)=>{
   
  const filteredProducts = products.filter((products) => products.price < 300);
  return filteredProducts; 
}
const getProductByID=(id)=>{
  const foundProduct=products.find((product)=>product.id == id);

  return foundProduct; 

}
const createProduct=(data)=>{
 products.push(data)
 fs.writeFileSync("./src/data/products.json",JSON.stringify(products));
     

}
export default {getProducts,getProductByID,createProduct}