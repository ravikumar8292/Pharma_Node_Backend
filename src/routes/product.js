import express from "express";
import productController from "../controllers/productController.js";
import { verifyToken } from "../middlewares/auth.js";


const router = express.Router();



router.post(
    "/add-product",verifyToken,
    productController.addproduct
);
router.get(
    "/all-products",verifyToken,
    productController.getallproducts
);
router.get(
    "/single-product",verifyToken,
    productController.singleproduct
);
router.patch(
    "/update-product",verifyToken,
    productController.updateProduct
);
router.delete(
    "/delete-product", verifyToken,
    productController.deleteProduct
);



export default router;