import { Router } from "express";
import express from "express"
import { login, signup } from "../controllers/auth.controller";
import { errorHandler } from "../errorhandler/error-handler";


const authRoutes:Router=express.Router()
authRoutes.post("/signup",errorHandler(signup))
authRoutes.post("/login",errorHandler(login))
authRoutes.post("/logout",)
export default authRoutes
