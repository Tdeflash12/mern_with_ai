import dotenv from "dotenv";

dotenv.config ();
const config = {
    mongoDB_URl :process.env.mongoDB_URl || "", 
    name:process.env.NAME || "",
    port:process.env.PORT || 5000,
    version:process.env.VERSION || "0.1.1",
    jwtSecret: process.env.jwtSecret || "",
    cloudinary:{
      cloudName : process.env.CLOUDINARY_CLOUD_NAME ||"",
      apiKey:process.env.CLOUDINARY_API_KEY ||"",
      apiSecret:process.env.CLOUDINARY_API_SECRET ||"",
    },
};
export default config;

