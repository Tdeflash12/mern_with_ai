import express from "express";
import orderController from "../controllers/orderController.js";
import auth from "../middleware/auth.js";
import roleBasedAuth from "../middleware/roleBasedAuth.js";
import { ADMIN } from "../constants/roles.js";
const router = express.Router();

//URL:/api/orders
router.get("/", auth, roleBasedAuth(ADMIN), orderController.getOrders);
router.get("/user", auth, orderController.getOrdersByUser);
router.get("/:id", auth, roleBasedAuth(ADMIN), orderController.getOrdersById);
router.put("/:id", auth, roleBasedAuth(ADMIN), orderController.updateOrder);

router.post("/", auth, orderController.createOrder);
router.delete("/:id", auth, roleBasedAuth(ADMIN), orderController.deleteOrder);
//
router.post("/:id/payment/khalti", auth, orderController.orderPaymentViaKhalti);
router.put( "/:id/payment/confirm-payment",auth,orderController.confirmOrderPayment,
);

export default router;
