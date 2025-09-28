// middlewares/auth.js
import jwt from "jsonwebtoken";
import { ApiError } from "./errorHandler.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
//   console.log("auth header here for token",authHeader)

  if (!authHeader) {
    return next(new ApiError("No token provided", 401));
  }

  const token = authHeader.split(" ")[1]; // Expecting: "Bearer <token>"

  if (!token) {
    return next(new ApiError("Invalid token format", 401));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new ApiError("Unauthorized or expired token", 403));
    }

    // Save decoded payload (userId, role, etc.) for later use
    req.user = decoded;
    next();
  });
};
