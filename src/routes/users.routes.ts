import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import adminMiddleware from "../middlewares/admin";
import { errorHandler } from "../errorhandler/error-handler";
import { addAddress, changeUserRole, deleteAddress, getUserById, listAddress, listUsers, updateUser } from "../controllers/users.controller";

const userRoutes:Router=Router()
userRoutes.post("/addresses",authMiddleware,errorHandler(addAddress))
userRoutes.delete("/addresses/:id",authMiddleware,errorHandler(deleteAddress))
userRoutes.get("/addresses",authMiddleware,errorHandler(listAddress))
userRoutes.put("/",authMiddleware,errorHandler(updateUser))
userRoutes.get("/",[authMiddleware,adminMiddleware],listUsers)
userRoutes.get("/:id",[authMiddleware,adminMiddleware],getUserById)
userRoutes.put("/:id/role",[authMiddleware,adminMiddleware],changeUserRole)

export default userRoutes

