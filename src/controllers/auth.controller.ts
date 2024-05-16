import { NextFunction, Request,Response } from "express"
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secret";
import { BadRequestsException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { SignUpSchema } from "../schema/users";
import { UnprocessableEntity } from "../exceptions/validation";


export  const signup=async (req:Request,res:Response)=>{
    const schema= SignUpSchema.safeParse(req.body)
    if(!schema.success){
  throw new UnprocessableEntity(schema.error.issues,"unable to validate your data",ErrorCode.UNPROCESSABLE_ENTITY)
    }

    
    // try{
    const {name,email,password}=req.body;

    let user=await prismaClient.user.findFirst({where:{email}})
    if(user){
      throw new BadRequestsException("user already exists",ErrorCode.USER_ALREADY_EXISTS)
       
    }
    user=await prismaClient.user.create({
        data:{
            name,
            email,
            password:hashSync(password,10)
        }
        

    })
    
    return res.status(201).json({message:"successfull created your account",user}) 
}
// catch(err:any){
    // next(new UnprocessableEntity(err?.cause?.issues,"invalid data",ErrorCode.UNPROCESSABLE_ENTITY))
// }   
// }
export const login=async (req:Request,res:Response,next:NextFunction)=>{
    // try{
    const {email,password}=req.body
    let  user =await prismaClient.user.findFirst({where:{email}})
    if(!user){
  throw new BadRequestsException("user does not exist",ErrorCode.USER_NOT_FOUND)
 
    }
    const isMatch= compareSync(password,user.password)
    if(!isMatch){
    throw new BadRequestsException("incorrect password",ErrorCode.INCORRECT_PASSWORD)
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
