import dotenv from "dotenv";

dotenv.config ();
const resolveMongoUrl = () => {
  const mongoUrl =
    process.env.MONGODB_URL ||
    process.env.MONGO_DB_URL ||
    process.env.mongoDB_URl ||
    "";

  if (mongoUrl.startsWith("mongodb://") || mongoUrl.startsWith("mongodb+srv://")) {
    return mongoUrl;
  }
  return "";
};

const config = {
    appUrL : process.env.APP_URL || "",
  mongoDB_URl : resolveMongoUrl(), 
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
    },
    emailApiKey:process.env.EMAIL_API_KEY || "",
    gemini:{
      url:process.env.GEMINI_URl || "",
      apiKey:process.env.GEMINI_API_KEY || "" 
    }
    
};
export default config;

