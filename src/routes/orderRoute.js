import express from "express";
import orderController from "../controllers/orderController.js";
import auth from "../middleware/auth.js";
import roleBasedAuth from "../middleware/roleBasedAuth.js";
import { ADMIN } from "../constants/roles.js";
const router = express.Router();

//URL:/api/orders
router.get("/", roleBasedAuth(ADMIN), orderController.getOrders);
router.get("/user", orderController.getOrdersByUser);
router.get("/:id", roleBasedAuth(ADMIN), orderController.getOrdersById);
router.put("/:id", orderController.updateOrder);

router.post("/", orderController.createOrder);
router.delete("/:id", orderController.deleteOrder);
//
router.post("/:id/payment/khalti", orderController.orderPaymentViaKhalti);
router.put("/:id/payment/confirm-payment", orderController.confirmOrderPayment);

export default router;
