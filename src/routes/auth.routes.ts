import { Router } from "express";
import express from "express"
import { login, signup } from "../controllers/auth.controller";
import { errorHandler } from "../errorhandler/error-handler";


const router:Router=express.Router()
router.post("/signup",errorHandler(signup))
router.post("/login",errorHandler(login))
export default router
