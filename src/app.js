import express from "express";
import fs from "fs" 
import config from "./config/config.js";


 
const app = express();

app.get("/",(req,res)=>{
  res.json({
 name: config.name,
 port: config.port,
 version: config.version,
  }); 
});  

app.get("/products",(req,res)=>{
    
  const products=  fs.readFileSync("./src/data/products.json","utf8")
    res.json(JSON.parse(products));
});
app.get("/not-found",(req,res)=>{
  res.status(404).send("Not found or error")
})
app.post("/",(req,res)=>{
  res.send("Data  created Successfu")
})
app.put("/",(req,res)=>{
  res.send("Data updated Successfully")
})


app.listen(config.port,()=>{
    console.log(`Server running at port ${config.port}...`);
})