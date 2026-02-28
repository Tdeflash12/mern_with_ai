import express from "express";

import config from "./config/config.js";
import todosRoute from "./routes/todoRoute.js"


import productRoutes from "./routes/productRoute.js";


 
const app = express();

app.get("/",(req,res)=>{
  res.json({
 name: config.name,
 port: config.port,
 version: config.version,
 status:"OK",
  }); 
});  

app.use("/products",productRoutes);
app.use("/todos", todosRoute);

app.listen(config.port,()=>{
    console.log(`Server running at port ${config.port}...`);
})