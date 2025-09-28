// routes/cart.js
import express from "express";
import cartController from "../controllers/cartController.js";
// import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", verifyToken, cartController.addToCart);
router.get("/", verifyToken, cartController.getCart);
router.delete("/remove", verifyToken, cartController.removeFromCart);
router.delete("/cart", verifyToken, cartController.ClearCart)

export default router;
