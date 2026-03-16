import dotenv from "dotenv";

dotenv.config ();
const config = {
    appUrL : process.env.APP_URL || "",
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
    khalti:{
      apiKey:process.env.KHALTI_API_KEY || "",
      apiUrl:process.env.KHALTI_API_URL || "",
      returnUrl:process.env.KHALTI_RETURN_URL || "",

    }
};
export default config;

