import express from "express";
import authController from "../controllers/authController.js";
import { verifyToken } from "../middlewares/auth.js";


const router = express.Router();



router.post(
    "/register",
    authController.register
);

router.post(
    "/login",
    authController.login
)

router.get("/profile", verifyToken, authController.UserProfile)
router.put("/update-profile", verifyToken, authController.UpdateProfile)
// router.post("/logout", verifyToken, authController.logout)


export default router;