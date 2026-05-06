import orderService from "../services/orderService.js";
import type { Request, Response } from "express";
import type { User } from "../types";

type AuthRequest = Request & { user: User };

const getOrders = async (_req: Request, res: Response) => {
  try {
    const data = await orderService.getOrders();
    res.json(data);
  } catch (error: any) {
    res.status(error?.statusCode || 500).send(error?.message || "Failed");
  }
};

const getOrdersByUser = async (req: AuthRequest, res: Response) => {
  try {
    const data = await orderService.getOrdersByUser(req.user._id);
    res.json(data);
  } catch (error: any) {
    res.status(error?.statusCode || 500).send(error?.message || "Failed");
  }
};

const getOrdersById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const data = await orderService.getOrdersById(req.params.id);
    res.json(data);
  } catch (error: any) {
    res.status(error?.statusCode || 500).send(error?.message || "Failed");
  }
};

const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const input = req.body as any;
    if (!input.orderItems || !input.orderItems.length) return res.status(400).send("Order items are required.");
    const data = await orderService.createOrder(req.body, req.user);
    res.json(data);
  } catch (error: any) {
    res.status(error?.statusCode || 500).send(error?.message || "Failed");
  }
};

const updateOrder = async (req: AuthRequest & Request<{ id: string }>, res: Response) => {
  try {
    const data = await orderService.updateOrder(req.params.id, req.body, req.user);
    res.json(data);
  } catch (error: any) {
    res.status(error?.statusCode || 500).send(error?.message || "Failed");
  }
};

const deleteOrder = async (req: AuthRequest & Request<{ id: string }>, res: Response) => {
  try {
    await orderService.deleteOrder(req.params.id, req.user);
    res.send("Order deleted successfully.");
  } catch (error: any) {
    res.status(error?.statusCode || 500).send(error?.message || "Failed");
  }
};

const orderPaymentViaKhalti = async (req: AuthRequest & Request<{ id: string }>, res: Response) => {
  try {
    const data = await orderService.orderPaymentViaKhalti(req.params.id, req.user);
    res.json(data);
  } catch (error: any) {
    res.status(error?.statusCode || 500).send(error?.message || "Failed");
  }
};

const confirmOrderPayment = async (req: AuthRequest & Request<{ id: string }>, res: Response) => {
  try {
    const data = await orderService.confirmOrderPayment(req.params.id, req.body.status, req.user);
    res.json(data);
  } catch (error: any) {
    res.status(error?.statusCode || 500).send(error?.message || "Failed");
  }
};

const getOrdersOfMerchant = async (req: AuthRequest, res: Response) => {
  try {
    const data = await orderService.getOrdersOfMerchant(req.user._id);
    res.json(data);
  } catch (error: any) {
    res.status(error?.statusCode || 500).send(error?.message || "Failed");
  }
};

export default {
  getOrders,
  createOrder,
  deleteOrder,
  getOrdersByUser,
  getOrdersById,
  updateOrder,
  orderPaymentViaKhalti,
  confirmOrderPayment,
  getOrdersOfMerchant,
};
