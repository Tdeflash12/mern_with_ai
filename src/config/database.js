import mongoose  from "mongoose";
import config from "./config.js";
async function connectDB(){
   if (!config.mongoDB_URl) {
      console.log("No valid MongoDB URL provided; skipping DB connection.");
      return;
   }

   try {
      const status = await mongoose.connect(config.mongoDB_URl);
      console.log(`Mongo db connected:${status.connection.host}`);
   } catch (error) {
      console.log("MongoDB connection error:", error);
   }
}
export default connectDB;