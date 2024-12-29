import express from "express";
import {
    AddProduct,
    deleteProduct,
    FetchAllProduct,
    ProductDetails,
    Search
} from "../controllers/product.controller.js";
import upload from "../middleware/multer.middlewere.js";


const router = express.Router();

router.post("/add-product", upload.array('images' , 10) , AddProduct);
router.delete("/delete-product/:id", deleteProduct);
router.get("/FetchProduct", FetchAllProduct);
router.get("/ProductDetails/:id", ProductDetails);
router.get("/search-product/:query", Search);
export default router;
