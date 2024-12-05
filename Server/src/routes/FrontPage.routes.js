import { Router } from "express";
import { banner, sepicalcategory ,GetAllBanner,GetAllSepicalCategory} from "../controllers/FrontPage.controller.js"
import upload from "../middleware/multer.middlewere.js";

const router = Router();

router.post("/addSpecialCategory" , upload.single('images') ,sepicalcategory);
router.post("/addBanner", upload.single('images') , banner);

router.route("/GetAllBanner").get(GetAllBanner) ;
router.route("/GetAllSpecialCategory").get(GetAllSepicalCategory) ;

export default router ;