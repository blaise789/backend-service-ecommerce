import {Request, Response } from "express";
import { ChangeQuantitySchema, CreateCartSchema } from "../schema/cart";
import { prismaClient } from "..";
import { RequestWithUser } from "../types/reqWithUser";

export const addItemToCart=async(req:Request,res:Response)=>{
    const validatedData=CreateCartSchema.parse(req.body)
   try{
    const product=await prismaClient.product.findFirstOrThrow({
        where:{
            id:validatedData.productId
        }
    })
   
   }
   catch(err){

   }
const cartItem=await prismaClient.cartItem.create({
    data:
})

}
export const deleteItemFromCart=async(req:Request,res:Response)=>{}
export const changeQuantity=async(req:Request,res:Response)=>{
    const validatedData=ChangeQuantitySchema.parse(req.body)
    const updatedCart=await prismaClient.cartItem.update({
        where:{
            id:+req.params.id
        },
        data:{
            quantity:validatedData.quantity
        }
    })
    res.json(updatedCart)
}
export const getCart=async(req:RequestWithUser,res:Response)=>{
    const cart=await prismaClient.cartItem.findMany({
        where:{
            userId:+req.user.id
        },
        include:{
            product:true
        }
    })
    res.json(cart)
}