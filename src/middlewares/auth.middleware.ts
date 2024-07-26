import e, { NextFunction, Request, Response } from "express";
import { UnAuthorizedException } from "../exceptions/unauthorized.exception";
import { ErrorCode } from "../exceptions/root";
import { JWT_SECRET } from "../secret";
import * as jwt from "jsonwebtoken"
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found.exception";
import { RequestWithUser } from "../types/reqWithUser";


export  const authMiddleware=async (req:RequestWithUser,res:Response,next:NextFunction)=>{
    
 
    try{
        const bearer=req.headers.authorization

        
        if(!bearer){
            throw new UnAuthorizedException("Unauthorized end point",ErrorCode.UNAUTHORIZED_EXCEPTION)
            
        }
        const token=bearer.split(" ")[1]

   const payload= jwt.verify(token,JWT_SECRET)  as jwt.JwtPayload
   console.log(payload)
   const user= await prismaClient.user.findFirst({where:{id:payload.userId}})
   
   if(!user){
    throw new NotFoundException("user does not exists",ErrorCode.USER_NOT_FOUND)
   }
   req.user=user
   next()
   
   
    }
    catch(err:any){
        // 
    next(new UnAuthorizedException("Unauthorized invalid token",ErrorCode.UNAUTHORIZED_EXCEPTION))
    }
    

   
  

   
}