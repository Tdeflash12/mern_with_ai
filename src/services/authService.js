import user from "../models/User.js";
import bcrypt from "bcryptjs";
import ResetPassword from "../models/ResetPassword.js";
import config from "../config/config.js";
const login = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (!user) throw { statusCode: 404, message: "User not found" };
  const isPasswordMatch = bcrypt.compareSync(data.password, user.password);
  if (!isPasswordMatch) throw { message: "incorrect email or  password" };
  return user;
};
const register = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (user) throw { statusCode: 400, message: "User  already exit" };
  const hashedPassword = bcrypt.hashSync(data.password);

  const registerUser = await User.create({
    name: data.name,
    address: data.address,
    email: data.email,
    password: hashedPassword,
    phone: data.phone,
  });
  return {
    _id: user._id,
    name: user.name,
    address: user.address,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };
};
const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw { statusCode: 404, message: "User not found. " };
  const token = crypto.randomUUID();
  await ResetPassword.create({
    userId: user._id,
    token,
  });
  // send email
  await sendEmail(email, {
    subject: "Reset password Link",
    body: `<div>
  <h1>Please click the link to reset your password.</h1>

  <a
    href="${config.appUrl}/reset-password?token=${token}&userId=${user._id}";
    style="
      padding: 5px 15px;
      background-color: lightblue;
      color: black;
      text-decoration: none;
    "
  >
    Reset password
  </a>
</div>`,
  });
  return { message: "Reset password Link sent successfully." };
};
const resetPassword = async (userId, token, newPassword) => {
  const user = await ResetPassword.findOne({
    userId,
    expiresAt: { $gt: Date.now() },
    isUsed: false,
    userId,
  }).sort({ expiresAt: -1 });

  if (!data || data.token !== token) {
    throw { statusCode: 400, message: "Invalid or expired token. " };
  }
  if (data.isUsed) {
    throw { statusCode: 400, message: "Token has been already used . " };
  }
  const hashedPassword = bcrypt.hashSync(newPassword);
  await User.findByIdAndUpdate(userId, {
    password: hashedPassword,
  });
  await resetPassword.findByIdAndUpdate(data._id, {
    isUsed: true,
  });
  return { message: "Password Reset Successfully" };
};
export default { register, login, forgotPassword, resetPassword };
