import { Router } from "express";
import { AddCategory , DeleteCategory , GetAllCategory } from "../controllers/cateogry.controller.js"


const router = Router();

router.post("/add-category" , AddCategory) ;
router.delete("/DeleteCategory/:id" , DeleteCategory) ;
router.get("/GetAllCategory" , GetAllCategory)

export default router 
