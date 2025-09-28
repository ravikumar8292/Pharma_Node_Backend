import Product from "../models/product.js";
import { ApiError } from "../middlewares/errorHandler.js";
import { validationResult } from "express-validator";

const addproduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const [firstError] = errors.array();
      throw new ApiError(firstError?.msg || "Validation error", 400);
    }

    const { title, description, price } = req.body;

    const addproduct = await Product.create({
      title,
      description,
      price,
    });

    if (!addproduct)
      throw new ApiError("Error occurred while creating product", 400);

    res.status(201).json({
      success: true,
      message: "product create successfull",
    });
  } catch (error) {
    next(error);
  }
};

const getallproducts = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const [firstError] = errors.array();
      throw new ApiError(firstError?.msg || "Validation error", 400);
    }
    const allProducts = await Product.findAll();
    if(!allProducts || allProducts.length === 0){
        throw new ApiError("No Product found", 404);
    }

    res.status(200).json({
        success: true,
        count: allProducts.length,
        products: allProducts,
    })
  } catch (error) {
    next(error);
  }
};

const singleproduct = async (req, res, next)=>{
    try{
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const [firstError] = errors.array();
      throw new ApiError(firstError?.msg || "Validation error", 400);
    }

    const {id} = req.query;
    console.log(id)

    const singleProduct = await Product.findOne({
        where: {id}
    })

    if(!singleProduct) throw new ApiError("product not found",404)
    console.log("single products",singleProduct)

    res.status(200).json({
        success: true,
        product: singleProduct
    })

    }catch(error){
        next(error);
    }
}

const updateProduct = async (req, res, next)=>{
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const [firstError] = errors.array();
      throw new ApiError(firstError?.msg || "Validation error", 400);
    }

    const {id} = req.query;
    const {title, description, price} = req.body;

    // console.log(id, "id here for update")
    // console.log("req body here",req.body)

    const updateData = {};
    if(title !== undefined) updateData.title = title;
    if(description !== undefined) updateData.description = description;
    if(price !== undefined) updateData.price = price;

    if(updateData.length === 0){
        throw new ApiError("No fields provided for update",400);
    }

    const updatedProduct = await Product.update(
        updateData,
        {
            where : {id}
        }
    )

    if(!updatedProduct) throw new ApiError("Product not found or nothing to update",404)

    const updatedPro = await Product.findOne({
        where: {id}
    })

    res.status(200).json({
        success: true,
        message:"Product updated successfully",
        product: updatedPro
    })
        
    } catch (error) {
        next(error)
    }
}

const deleteProduct = async (req, res, next)=>{
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const [firstError] = errors.array();
      throw new ApiError(firstError?.msg || "Validation error", 400);
    }

    const {id} = req.query;

    const deleteProduct = await Product.destroy({
        where: {id}
    })

    if(!deleteProduct) throw new ApiError("product not found",404)

    res.status(200).json({
        success: true,
        message: "Product delete successfully"
    })
        
    } catch (error) {
        next(error);
    }
}

export default {
  addproduct,
  getallproducts,
  singleproduct,
  updateProduct,
  deleteProduct
};
