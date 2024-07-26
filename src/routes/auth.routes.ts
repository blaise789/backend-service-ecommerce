import { Router } from "express";
import express from "express"
import { login, signup } from "../controllers/auth.controller";
import { errorHandler } from "../errorhandler/error-handler";


const productRouter:Router=express.Router()
productRouter.post("/signup",errorHandler(signup))
productRouter.post("/login",errorHandler(login))
export default productRouter
