import express from "express";
import authRoutes from "./auth.js"
import productRoutes from "./product.js"
import cartRoutes from "./cart.js"


const router = express.Router();


router.use("/auth", authRoutes);
router.use("/product",productRoutes)
router.use("/cart",cartRoutes)



export default router;