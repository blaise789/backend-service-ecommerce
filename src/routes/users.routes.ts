import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import adminMiddleware from "../middlewares/admin";
import { errorHandler } from "../errorhandler/error-handler";
import { addAddress, deleteAddress, listAddress, updateUser } from "../controllers/users.controller";

const userRoutes:Router=Router()
userRoutes.post("/addresses",authMiddleware,errorHandler(addAddress))
userRoutes.delete("/addresses/:id",authMiddleware,errorHandler(deleteAddress))
userRoutes.get("/addresses",authMiddleware,errorHandler(listAddress))
userRoutes.put("/",authMiddleware,errorHandler(updateUser))


export default userRoutes

