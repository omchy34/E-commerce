import { Router } from "express";
import { Registration, Login, userData , AllUsers , DeleteUser} from "../controllers/user.controller.js";
import { Auth } from "../middleware/user.middleware.js";

const router = Router()

router.route("/Register").post(Registration)
router.route("/Login").post(Login)
router.route("/userData").get(Auth, userData)
router.route("/AllUsers").get(AllUsers) ;
router.route("/DeleteUser/:id").delete(DeleteUser)

export default router;