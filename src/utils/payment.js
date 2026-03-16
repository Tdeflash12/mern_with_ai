import axios from "axios";
import config from "../config/config.js";

const payViaKhalti = async (data) => {
  if (!data) throw { message: "Payment Data is required" };
  if (!data.amount) throw { message: "Payment amount is required" };
  if (!data.purchaseOrderId)
    throw { message: "Purchase Order id   is required" };
  if (!data.purchaseOrderName)
    throw { message: "Purchase Order name    is required" };
  const body = {
    return_url: config.khalti.returnUrl,
    amount: data.amount,
    website_url: config.appUrL,
    purchase_order_id: data.purchaseOrderId,
    purchase_order_name: data.purchaseOrderName,
    customer_info: {
      name: data.customer.name,
      email: data.customer.email,
      phone: data.customer.phone,
    },
  };
  const response = await axios.post(
    `${config.khalti.apiUrl}/epayment/initiate/`,
    body,
    {
      headers: {
        Authorization: `key ${config.khalti.apiKey}`,
      },
    },
  );
  return response.data;
};
export default { payViaKhalti };
