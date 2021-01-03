import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"

export const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization
    // &&
    // req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization
      const decoded = jwt.verify(token, process.env.SECRET)
      req.user = await User.findById(decoded.id).select("-password")
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error("Not authorised, token not valid")
    }
  }

  if (!token) {
    res.status(401)
    throw new Error("Not authorised no token")
  }
})
