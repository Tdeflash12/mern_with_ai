import { profile } from "console";
import mongoose from "mongoose";
import { type } from "os";
import { ADMIN, MERCHANT, USER } from "../constants/roles";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required."],
  },
  email: {
    type: String,
    required: [true, "User email is required."],
    trim:true,
    lowercase:true,
     validate:{
        validator:(value)=>{
            const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
         return emailRegex.test(value);
        },
        message:"Invalid email address"
     }
  },
  password: {
    type: String,
    required: [true, "User email is required."],
    min: [6, "password length must be greater than 6."],
    
  },
  roles: {
    type: [String],
    default:[USER],
    enum: [USER, ADMIN, MERCHANT],
  },
  address: {
    city: {
      type: String,
      required: [true, "User city address is required"],
    },
    country: {
      type: String,
      default: "Nepal",
    },
    province: {
      type: String,
      required: [true, "User Province  is required"],
    },
    strict: {
      type: String,
    },
    phone:{
        type:String,
        required:[true,"User phone_no is required"],
        unique:[true,"phone number must be unique."],
    },
    profileImageUrl:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        immutable:true
    }
  },
});

const model = mongoose.model("User", userSchema);

export default model;
