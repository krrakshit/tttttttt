import express from "eexpress";
import { checkAuth,login,logout,signup,updateProfile} from "../controllers/auth.controller.js";
import { protctRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout",logout);

router.put("/update-profile", protctRoute, updateProfile);

router.get("/check",protctRoute,checkAuth);

export default router;
