import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import adminMiddleware from "../middlewares/admin";
import { errorHandler } from "../errorhandler/error-handler";
import { createProduct, deleteProduct, updateProduct } from "../controllers/product.controller";

const router:Router=Router()

router.post("/",[authMiddleware,adminMiddleware],errorHandler(createProduct))
router.put("/:id",[authMiddleware,adminMiddleware],errorHandler(updateProduct))
router.delete("/:id",[authMiddleware,adminMiddleware],errorHandler(deleteProduct))

export default router

