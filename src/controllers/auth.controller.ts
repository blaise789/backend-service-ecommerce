import { NextFunction, Request,Response } from "express"
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secret";
import { BadRequestsException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { User } from "@prisma/client";
export  const signup=async (req:Request,res:Response,next:NextFunction)=>{
    // try{
    const {name,email,password}=req.body;

    let user=await prismaClient.user.findFirst({where:{email}})
    if(user){
       next(new BadRequestsException("user already exists",ErrorCode.USER_ALREADY_EXISTS))  
       return
    }
    user=await prismaClient.user.create({
        data:{
            name,
            email,
            password:hashSync(password,10)
        }
        

    })
    
    res.status(201).json({message:"successfull created your account",user}) 
// }
// catch(err:any){
//     res.status(400).json({message:err.message})
// }   
}
export const login=async (req:Request,res:Response,next:NextFunction)=>{
    // try{
    const {email,password}=req.body
    let  user =await prismaClient.user.findFirst({where:{email}})
    if(!user){
 next(new BadRequestsException("user is not authenticated",ErrorCode.USER_NOT_FOUND))
 return
    }
    const isMatch= compareSync(password,user.password)
    if(!isMatch){
        next(new BadRequestsException("incorrect password",ErrorCode.INCORRECT_PASSWORD))
    }
    const token=jwt.sign({
        userId:user.id
        
    },
JWT_SECRET
    )
    res.status(200).json({message:"user logged in successfully",user,token})
}
// catch(err:any){
//     res.status(400).json({message:err.message})

    
// }
