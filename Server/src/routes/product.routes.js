import express from "express";
import {
    AddProduct,
    deleteProduct,
    FetchAllProduct,
    ProductDetails,
    FetchCartData,
    addToCart,
} from "../controllers/product.controller.js";
import upload from "../middleware/multer.middlewere.js";
import { Auth } from "../middleware/user.middleware.js";

const router = express.Router();

router.post("/add-product", upload, AddProduct);
router.delete("/delete-product/:id", deleteProduct);
router.get("/FetchProduct", FetchAllProduct);
router.get("/ProductDetails/:id", ProductDetails);

router.post("/addToCart", Auth, addToCart);
router.get("/FetchCartData", Auth, FetchCartData);
export default router;
