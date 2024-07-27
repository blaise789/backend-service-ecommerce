import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import adminMiddleware from "../middlewares/admin";
import { errorHandler } from "../errorhandler/error-handler";
import { createProduct, deleteProduct, findProduct, listProducts, searchProducts, updateProduct } from "../controllers/product.controller";

const productRoutes:Router=Router()

productRoutes.post("/",[authMiddleware,adminMiddleware],errorHandler(createProduct))
productRoutes.put("/:id",[authMiddleware,adminMiddleware],errorHandler(updateProduct))
productRoutes.delete("/:id",[authMiddleware,adminMiddleware],errorHandler(deleteProduct))
productRoutes.get("/:id",[authMiddleware,adminMiddleware],errorHandler(findProduct))
productRoutes.get("/",errorHandler(listProducts))
productRoutes.get("/search",errorHandler(searchProducts))
export default productRoutes

