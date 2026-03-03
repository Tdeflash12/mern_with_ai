import mongoose  from "mongoose";
import config from "./config.js";
async function connectDB(){
   try {
      const status= await mongoose.connect(config.mongoDB_URl)  ;
       console.log(`Mongo db connected:${status.connect.host}`)
   } catch (error) {
    console.log(error);
   } 
process.exit(1)
}
export default connectDB;