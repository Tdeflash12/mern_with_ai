import authService from "../services/authService.js";
import { createJWT } from "../utils/jwt.js";
import type { Request, Response } from "express";

const login = async (req: Request, res: Response) => {
  try {
    const input = req.body as any;
    if (!input || !input.email || !input.password) {
      return res.status(400).send("email and password are required");
    }
    const data = await authService.login(input);
    const authToken = createJWT(data);
    res.cookie("authToken", authToken, { maxAge: 86400 * 1000 });
    res.json(data);
  } catch (error: any) {
    res.status(error?.statuscode || 500).send(error?.message || "Login failed");
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const input = req.body as any;
    if (!input.password || !input.confirmPassword) {
      return res.status(400).send("Password and confirmPassword are required");
    }
    if (input.password !== input.confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }
    const data = await authService.register(input);
    const authToken = createJWT(data);
    res.cookie("authToken", authToken, { maxAge: 86400 * 1000 });
    res.status(201).json(data);
  } catch (error: any) {
    res.status(error?.statuscode || 500).send(error?.message || "Registration failed");
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const input = req.body as any;
    if (!input.email) return res.status(400).send("Email is required");
    const data = await authService.forgotPassword(input);
    res.status(201).json(data);
  } catch (error: any) {
    res.status(error?.statuscode || 500).send(error?.message || "Failed");
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const input = req.body as any;
    const query = req.query as Record<string, string | undefined>;
    if (!input.password || !input.confirmPassword) return res.status(400).send("Password required");
    if (input.password !== input.confirmPassword) return res.status(400).send("Passwords do not match");
    if (!query.token || !query.userId) return res.status(400).send("Token and userId required");
    const data = await authService.resetPassword(query.userId, query.token, input.password);
    res.status(201).json(data);
  } catch (error: any) {
    res.status(error?.statuscode || 500).send(error?.message || "Failed");
  }
};

const logout = (_req: Request, res: Response) => {
  res.clearCookie("authToken");
  res.json({ message: "Logout Successfully" });
};

export default { register, login, forgotPassword, resetPassword, logout };
