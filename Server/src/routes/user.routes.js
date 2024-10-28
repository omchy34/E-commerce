import { Router } from "express";
import { Registration, Login, userData , AllUsers} from "../controllers/user.controller.js";
import { Auth } from "../middleware/user.middleware.js";

const router = Router()

router.route("/Register").post(Registration)
router.route("/Login").post(Login)
router.route("/userData").get(Auth, userData)
router.route("/AllUsers").get(AllUsers) ;

export default router;