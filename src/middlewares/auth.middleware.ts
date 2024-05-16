import { NextFunction, Request, Response } from "express";
import { UnAuthorizedException } from "../exceptions/unauthorized.exception";
import { ErrorCode } from "../exceptions/root";
import { JWT_SECRET } from "../secret";
import * as jwt from "jsonwebtoken"
import { prismaClient } from "..";
import { any } from "zod";
import { NotFoundException } from "../exceptions/not-found.exception";

export const authMiddleware=async (req:Request,res:Response,next:NextFunction)=>{
    
 
    try{
        const token=req.headers.authorization
        if(!token){
            throw new UnAuthorizedException("Unauthorized end point",ErrorCode.UNAUTHORIZED_EXCEPTION)
            
            
        }
   const payload:{userId:number}= jwt.verify(token,JWT_SECRET)  as any
   const user=prismaClient.user.findFirst({where:{id:payload.userId}})
//    req.user=user
   if(!user){
    throw new NotFoundException("user does not exists",ErrorCode.USER_NOT_FOUND)
   }
 
   
    }
    catch(err:any){
        // 
    next(new UnAuthorizedException("Unauthorized invalid token",ErrorCode.UNAUTHORIZED_EXCEPTION))
    }
    

   
  

   
}