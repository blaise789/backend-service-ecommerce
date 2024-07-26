import { NextFunction, Request,Response } from "express";
import { RequestWithUser } from "../types/reqWithUser";
import { User } from "@prisma/client";
import { UnAuthorizedException } from "../exceptions/unauthorized.exception";
import { ErrorCode } from "../exceptions/root";
const adminMiddleware=async(req:RequestWithUser,res:Response,next:NextFunction)=>{
    const user=req.user 
    console.log(user)
    if(!user){
        return res.sendStatus(403)
    }
    if(user.role=='ADMIN'){
        next()
    }
    else{
        next(new UnAuthorizedException("Unauthorized",ErrorCode.UNAUTHORIZED_EXCEPTION))
    }
}
export default adminMiddleware