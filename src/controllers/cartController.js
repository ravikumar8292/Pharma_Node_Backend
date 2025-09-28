import { ApiError } from "../middlewares/errorHandler.js";
import { validationResult } from "express-validator";
import Cart from "../models/cart.js";
import Product from "../models/product.js";

const addToCart = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const [firstError] = errors.array();
      throw new ApiError(firstError?.msg || "Validation error", 400);
    }

    const { productId, quantity } = req.body;
    const userId = req.user.id;
    // console.log("user id",userId)

    // console.log("req body heree",req.body)

    const product = await Product.findOne({ where: { id: productId } });
    // console.log(product, "product here")

    if (!product) throw new ApiError("product not found", 404);

    const existing = await Cart.findOne({
      where: { userId, productId },
    });

    if (existing) {
      existing.quantity += quantity || 1;
      await existing.save();
    } else {
      await Cart.create({
        userId,
        productId,
        quantity: quantity || 1,
      });
    }

    res.status(201).json({
      success: true,
      message: "Product added to cart successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getCart = async (req, res, next)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const [firstError] = errors.array();
            throw new ApiError(firstError?.msg || "Validation error", 400)
        }

        const allCartData = await Cart.findAll({
            include: [
                {
                    model: Product,
                    as: "Product"
                }
            ]
        });
        // console.log("all cart data",allCartData);
          if(!allCartData || allCartData.length === 0){
        throw new ApiError("No Product found on cart", 404);
    }

        res.status(200).json({
            success: true,
            cart: allCartData?.map(cart => cart.toJSON())
        })


    } catch (error) {
        next(error)
    }
}

const removeFromCart = async (req, res, next)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const [firstError] = errors.array();
            throw new ApiError(firstError.msg || "validation error", 400)
        }
        const {productid} = req.query;
        console.log("product id", productid);
        const FilterCartData = await Cart.destroy({where: {productId: productid}});

        if(!FilterCartData) throw new ApiError("Product not found on cart",404)

        res.status(200).json({
            success: true,
            message: "product delete from cart successfully"
        })

    } catch (error) {
        next(error)
    }
}

const ClearCart =  async (req, res, next)=>{
  try {
     const errors = validationResult(req);
     if(!errors.isEmpty()){
      const [firstError] = errors.array();
      throw new ApiError(firstError.msg, "validation error", 400);
     }
     const userId = req.user.id;
     const clear = await Cart.destroy({where: {userId}});

     if(clear.length === 0){
        return res.status(200).json({
            success:true,
            message:"Cart is already empty",
        })
     }

     res.status(200).json({
        success: true,
        message: "Cart cleared successfully",
     })
     
  } catch (error) {
    next(error)
  }
}

export default {
  removeFromCart,
  getCart,
  addToCart,
  ClearCart,
};
