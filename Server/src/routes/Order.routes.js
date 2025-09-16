import express from "express";
import {
   createOrder,
   verifyOrder,
   FetchOrder,
   fetchAllOrders,
   updateOrderStatus,
   fetchOrderId
} from "../controllers/Order.controller.js";
import {Auth} from "../middleware/user.middleware.js";


const router = express.Router();

router.post("/Pay" , Auth , createOrder)
router.post("/VerifyOrder" , Auth , verifyOrder) ;
router.get("/FetchOrder", Auth , FetchOrder)
router.get("/fetchAllOrders" , fetchAllOrders)
router.put("/updateOrderStatus/:id", updateOrderStatus);
router.get("/fetchOrderId/:id", fetchOrderId);
export default router;
