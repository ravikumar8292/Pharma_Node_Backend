import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { ApiError } from "../middlewares/errorHandler.js";
import { where } from "sequelize";

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const [firstError] = errors.array();
      throw new ApiError(firstError?.msg || "Validation error", 400);
    }

    const { name, email, password, dob, ph, gender, address } = req.body;

    const isExist = await User.findOne({ where: { email } });
    if (isExist) throw new ApiError("User already exists", 400);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      dob,
      ph,
      address,
      gender,
    });

    if (!user) throw new ApiError("Error occurred while creating user", 400);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const [firstError] = errors.array();
      throw new ApiError(firstError?.msg || "Validation error", 400);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) throw new ApiError("Invalid credentials", 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ApiError("Invalid credentials", 401);

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

const UserProfile = async (req, res, next)=>{
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      const [firstError] = errors.array();
           throw new ApiError(firstError.msg || "validation error",400)
    }

    // const id = req.user.id;
    // console.log("id here",id)

    const user = await User.findByPk(req.user.id, {
      attributes : {exclude: ["password"]},
    })

    if(!user){
      throw new ApiError("user not found",404)
    }

    res.status(200).json({
      success:true,
      user
    })


  } catch (error) {
    next(error);
  }
}

const UpdateProfile = async (req, res, next)=>{
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      const [firstError] = errors.array();
      throw new ApiError(firstError.msg || "validation error", 400)
    }

    const id = req.user.id;
    const {name, email, ph, dob, gender, address} = req.body;

    const updateProfile = await User.update(
      {name, email, ph, dob, address, gender},
      {
        where: {id}
      }
    )

    if(!updateProfile) throw new ApiError("User not update profile",404)

    const profile = await User.findByPk(id,{
      attributes: {exclude: ["password"]},
    })

    res.status(200).json({
      success: true,
      message: "User profile update successfully",
      profile
    })

  } catch (error) {
    next(error)
  }
}

// const logout =  async (req, res, next)=>{
//   try {
//      const errors = validationResult(req);
//      if(!errors.isEmpty()){
//       const [firstError] = errors.array();
//       throw new ApiError(firstError.msg, "validation error", 400);
//      }


//   } catch (error) {
//     next(error)
//   }
// }

export default {
  register,
  login,
  UserProfile,
  UpdateProfile,
  // logout
};



// {

//     "email": "tester123@yopmail.com",
//     "password": "Tester22@123"
// }