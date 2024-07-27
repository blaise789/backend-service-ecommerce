import {Request, Response } from "express";
import { ChangeQuantitySchema, CreateCartSchema } from "../schema/cart";
import { prismaClient } from "..";
import { RequestWithUser } from "../types/reqWithUser";
import { BadRequestsException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { CartItem } from "@prisma/client";
import { NotFoundException } from "../exceptions/not-found.exception";

export const createOrder=async(req:RequestWithUser,res:Response)=>{
//   1. to create a transaction 
// 2.to list all the cart items and proceed if cart is not empty 
// 3. calculate the total amount
// 4.fetch address of the user 
// 5. to define computed field for formatted adddress on address module
// 6. we will create  a order and order 
// 7. create  event
// 8.to empty cart
return await prismaClient.$transaction(async(tx)=>{
     const cartItems=await tx.cartItem.findMany({
        where:{
        userId:req.user.id
        },
        include:{
            product:true
        }
     })
     if (cartItems.length==0){
    return res.json({message:"cart is empty"})
        //   throw new BadRequestsException("empty cart,Oops not cartItem found",ErrorCode.NOT_FOUND)
     }
    const totalCost=cartItems.reduce((prev,current)=>{
        console.log(prev)
        return prev+(current.quantity*+current.product.price)
    },0)
    const address=await tx.address.findFirstOrThrow({
        where:{
            userId:req.user.id
        }
    })
    const order=await  prismaClient.order.create({
        data:{
            userId:req.user.id,
            netAmount:totalCost,
            address:address.formattedAddress,
            products:{
                create:cartItems.map((cart)=>{
                    return {productId:cart.productId,quantity:cart.quantity,}
                })
            }
        }
    })
    const orderEvent= await tx.orderEvent.create({
        data:{
            orderId:order.id
        }
    })
    await tx.cartItem.deleteMany({
        where:{
            userId:req.user.id
        }
    })
res.json({order,orderEvent})

})
}

export const cancelOrder=async(req:RequestWithUser,res:Response)=>{
    const order =await prismaClient.order.findFirst({
        where:{
            id:+req.params.id
        },
        include:{
            products:true,
            orderEvents:true
        }
    })
    
    if(!order){
        throw new NotFoundException("order not found",ErrorCode.NOT_FOUND)
    }
    else if(order.userId!=req.user.id){
        return res.status(403)
    }
    const updatedOrder=await prismaClient.order.update({
        where:{
            id:+req.params.id
        },
        data:{
        status:'CANCELED'
        
    
        }

    })

    
    res.json(updatedOrder)
    
}
export const getOrderById=async(req:RequestWithUser,res:Response)=>{
    
    const order =await prismaClient.order.findFirst({
        where:{
            id:+req.params.id
        },
        include:{
            products:true,
            orderEvents:true
        }
    })
    
    if(!order){
        throw new NotFoundException("order not found",ErrorCode.NOT_FOUND)
    }
    else if(order.userId!=req.user.id){
        return res.status(403)
    }
 return res.json(order)
}

export const listAllOrders=async(req:RequestWithUser,res:Response)=>{
let whereClause={}
const status=req.query.status
if(status){
    whereClause={
        status
    }
}
const orders=await prismaClient.order.findMany({
    where:whereClause,
    skip:+req.query.skip || 0,
    take:5
})
return res.json(orders)
}
export const updateOrderStatus=()=>{

}