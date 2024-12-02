import { Router } from "express";
import { AddBestDeals , DeleteBestDeals , GetAllBestDeals } from "../controllers/BestDeals.controller.js"

const router = Router();

router.post("/add-BestDeals" , AddBestDeals) ;
router.delete("/DeleteBestDeals/:id" , DeleteBestDeals) ;
router.get("/getBestDeals", GetAllBestDeals);

export default router