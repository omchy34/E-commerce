import express from "express";
import {
   createOrder,
   verifyOrder,
   FetchOrder,
   fetchAllOrders
} from "../controllers/Order.controller.js";
import {Auth} from "../middleware/user.middleware.js";


const router = express.Router();

router.post("/Pay" , Auth , createOrder)
router.post("/VerifyOrder" , Auth , verifyOrder) ;
router.get("/FetchOrder", Auth , FetchOrder)
router.get("/fetchAllOrders" , fetchAllOrders)
export default router;
