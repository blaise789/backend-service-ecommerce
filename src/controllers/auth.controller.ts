import { Request,Response } from "express"
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secret";
export  const signup=async (req:Request,res:Response)=>{
    try{
    const {name,email,password}=req.body;

    let user=await prismaClient.user.findFirst({where:{email}})
    if(user){
        throw new Error("user already exists")
    }
    user=await prismaClient.user.create({
        data:{
            name,
            email,
            password:hashSync(password,10)
        }
        

    })
    
    res.status(201).json({message:"successfull created your account",user}) 
}
catch(err:any){
    res.status(400).json({message:err.message})
}   
}
export const login=async (req:Request,res:Response)=>{
    try{
    const {email,password}=req.body
    let user=await prismaClient.user.findFirst({where:{email}})
    if(!user){
 throw new Error("user is not authenticated")
    }
    const isMatch= compareSync(password,user.password)
    if(!isMatch){
        throw new Error("invalid credentials")
    }
    const token=jwt.sign({
        userId:user.id
        
    },
JWT_SECRET
    )
    res.status(200).json({message:"user logged in successfully",user,token})
}
catch(err:any){
    res.status(400).json({message:err.message})

    
}
}