import user from "../models/User.js"
import bcrypt from "bcryptjs";
const login=async(data)=>{
  const user =await User.findOne({email:data.email});
  if(!user) throw {statusCode:404, message:"User not found"}
  const isPasswordMatch=bcrypt.compareSync(data.password,user.password);
  if(!isPasswordMatch) throw {message:"incorrect email or  password"}
  return user;
}
const register =async(data)=>{
     const user =await User.findOne({email:data.email});
  if(user) throw {statusCode:400, message:"User  already exit"}
    const hashedPassword =bcrypt.hashSync(data.password)
    
   const registerUser= await User.create({
        name:data.name,
        address:data.address,
        email:data.email,
        password:hashedPassword,
        phone:data.phone,
    });
   return{
    _id:user._id,
    name:user.name,
        address:user.address,
        email:user.email,
        phone:user.phone,
        role:user.role,
   }
    
};
export default {register,login};