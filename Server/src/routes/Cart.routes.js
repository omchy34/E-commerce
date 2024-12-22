import { Router } from "express";
import { AddToCart, deleteFromCart, updateCart, FetchCart } from "../controllers/Cart.controller.js";
import { Auth } from "../middleware/user.middleware.js";

const router = Router();

router.post("/add-to-cart", Auth, AddToCart);
router.put("/update-cart/:id", Auth, updateCart);
router.delete("/delete-from-cart/:id", Auth, deleteFromCart);
router.get("/fetch-cart", Auth, FetchCart);

export default router;
