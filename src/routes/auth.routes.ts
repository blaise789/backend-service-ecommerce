import { Router } from "express";
import express from "express"
import { login, signup } from "../controllers/auth.controller";
import { handleError } from "../middlewares/error-handler.middleware";


const router:Router=express.Router()
router.post("/signup",signup,)
router.post("/login",login)
export default router
