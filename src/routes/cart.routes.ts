import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import adminMiddleware from "../middlewares/admin";
import { errorHandler } from "../errorhandler/error-handler";
import { addAddress, deleteAddress, listAddress, updateUser } from "../controllers/users.controller";
import { addItemToCart, changeQuantity, deleteItemFromCart, getCart } from "../controllers/cart.controller";

const cartRoutes:Router=Router()
cartRoutes.post("/",authMiddleware,errorHandler(addItemToCart))
cartRoutes.delete("/:id",authMiddleware,errorHandler(deleteItemFromCart))
cartRoutes.get("/",authMiddleware,errorHandler(getCart))
cartRoutes.put("/:id",authMiddleware,errorHandler(changeQuantity))


export default cartRoutes

