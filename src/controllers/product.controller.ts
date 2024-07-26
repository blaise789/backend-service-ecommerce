import { NextFunction, Request, Response } from "express"
import createProductSchema from "../schema/product"
import { PrismaClient } from "@prisma/client"
import { prismaClient } from ".."
import { UnprocessableEntity } from "../exceptions/validation"
import { ErrorCode } from "../exceptions/root"

export const createProduct=async (req:Request,res:Response,next:NextFunction)=>{
    const parsedData=createProductSchema.safeParse(req.body)
if(!createProductSchema.safeParse(req.body).success)
    return next(new UnprocessableEntity(parsedData.error?.issues, "error in validation",ErrorCode.UNPROCESSABLE_ENTITY))



const product=prismaClient.product.create({
    data:{
        ...req.body,
        tags:req.body.tags.join(",")
         
    
    
    }
})
res.json(product)
}
export const updateProduct=async()=>{

}
export const deleteProduct=async()=>{

}