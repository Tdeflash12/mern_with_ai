import dotenv from "dotenv";

dotenv.config ();
const config = {
    mongoDB_URl :process.env.mongoDB_URl || "", 
    name:process.env.NAME || "",
    port:process.env.PORT || 5000,
    version:process.env.VERSION || "0.1.1",
    jwtSecret: process.env.jwtSecret || "",
    


};
export default config;
const updateProduct = () => {
  Prod;
};
