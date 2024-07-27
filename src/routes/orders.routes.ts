import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { cancelOrder, createOrder, getOrderById, listOrders } from "../controllers/order.controller";

const ordersRoutes:Router=Router()
ordersRoutes.post("/",authMiddleware,createOrder)
ordersRoutes.get("/",authMiddleware,listOrders)
ordersRoutes.get("/:id",authMiddleware,getOrderById)
ordersRoutes.put("/:id/cancel",authMiddleware,cancelOrder)


export default ordersRoutes
