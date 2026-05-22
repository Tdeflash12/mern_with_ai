import jwt from "jsonwebtoken";

import authService from "../services/authService.js";
import { createJWT } from "../utils/jwt.js";
const login = async (req, res) => {
  try {
    const input = req.body;
    if (!input) {
      return res.status(400).send("Required data are missing ");
    }
    if (!input.email) {
      return res.status(400).send("email is required");
    }
    if (!input.password) {
      return res.status(400).send("Password is required");
    }
    const data = await authService.login(input);

    const authToken = createJWT(data);
    res.cookie("authToken", authToken, { maxAge: 86400 * 1000 });

    res.json(data);
  } catch (error) {
    res.status(error.statuscode || 500).send(error.message);
  }
};

const register = async (req, res) => {
  const input = req.body;

  try {
    if (!input.password) {
      return res.status(400).send("Password is required");
    }
    if (!input.confirmPassword) {
      return res.status(400).send("Password is required");
    }
    if (input.password !== input.confirmPassword) {
      return res.status(400).send("Passwords do not  match");
    }
    const data = await authService.register(input);
    const authToken = createJWT(data);
    res.cookie("authToken", authToken, { maxAge: 86400 * 1000 });
    res.status(201).json(data);
  } catch (error) {
    res.status(error.statuscode || 500).send(error.message);
  }
};
const forgotPassword = async (req, res) => {
  const input = req.body;

  try {
    if (!input.email) {
      return res.status(400).send("Email Addresses  is required");
    }
    const data = await authService.forgotPassword(input);
    res.status(201).json(data);
  } catch (error) {
    res.status(error.statuscode || 500).send(error.message);
  }
};
const resetPassword = async (req, res) => {
  const input = req.body;
  const query = req.query;

  try {
    if (!input.password) {
      return res.status(400).send("Password is required");
    }
    if (!input.confirmPassword) {
      return res.status(400).send("Password is required");
    }
    if (input.password !== input.confirmPassword) {
      return res.status(400).send("Passwords do not  match");
    }
    if (!query.token || !query.userId) {
      return res.status(404).send("Token and userID are required ");
    }
    const data = await authService.resetPassword(
      query.userId,
      query.token,
      input.password,
    );
    res.status(201).json(data);
  } catch (error) {
    res.status(error.statuscode || 500).send(error.message);
  }
};
const logout = async (req, res) => {
  res.clearCookie("authToken")
  res.json({message:"Logout Successfully"})

}
export default { register, login, forgotPassword ,resetPassword,logout };
