import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { cancelOrder, createOrder, getOrderById, listAllOrders, updateOrderStatus } from "../controllers/order.controller";

const ordersRoutes:Router=Router()
ordersRoutes.post("/",authMiddleware,createOrder)
ordersRoutes.get("/",authMiddleware,listAllOrders)
ordersRoutes.get("/:id",authMiddleware,getOrderById)
ordersRoutes.put("/:id/cancel",authMiddleware,cancelOrder)
ordersRoutes.put("/:id/status",authMiddleware,updateOrderStatus)


export default ordersRoutes
