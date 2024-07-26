import { NextFunction, Request, Response } from "express"
import { AddressSchema, UpdateUserSchema } from "../schema/users"
import { NotFoundException } from "../exceptions/not-found.exception"
import { ErrorCode } from "../exceptions/root"
import { RequestWithUser } from "../types/reqWithUser"
import { prismaClient } from ".."
import { Address, User } from "@prisma/client"
import { BadRequestsException } from "../exceptions/bad-request"

export const addAddress=async(req:RequestWithUser,res:Response,next:NextFunction)=>{
AddressSchema.parse(req.body)

const address=await prismaClient.address.create({
  data:{
    ...req.body,
    userId:req.user.id 

  }
})
return res.json(address)
}
export const deleteAddress=async(req:Request,res:Response,next:NextFunction)=>{
  try{
    await prismaClient.address.delete({
      where:{
        id:+req.params.id
      }

    })
    res.json({success:true})
  }
  catch(err:any){
    throw new NotFoundException("Address not found",ErrorCode.NOT_FOUND)
  }

}
export const listAddress=async(req:RequestWithUser,res:Response,next:NextFunction)=>{
const addresses=await prismaClient.address.findMany({
  where:{
    userId:req.user.id
  }
  
})
return res.json(addresses)
}
export const updateUser=async(req:RequestWithUser,res:Response)=>{
  let billingAddress:Address
  let shippingAddress:Address

console.log(req.body)
const validatedData=UpdateUserSchema.parse(req.body)
console.log(validatedData)
const userId=req.user.id
if(validatedData.defaultBillingAddress){
  try{
    billingAddress= await prismaClient.address.findFirstOrThrow({
      where:{
        id:validatedData.defaultBillingAddress
      }
    })
    if (billingAddress.userId!=userId){
      throw new BadRequestsException("address does not belong to the user",ErrorCode.NOT_FOUND)
    }
  }
  catch(err){
 throw new NotFoundException("Address not found",ErrorCode.NOT_FOUND)
  

  }
 
  // address with this id will become the billing addres

}
else if(validatedData.defaultShippingAddress){
  try{
    shippingAddress=await prismaClient.address.findFirstOrThrow({
      where:{
        id:validatedData.defaultShippingAddress
      }
    }) 
  if(shippingAddress.userId!=userId){
    throw new NotFoundException("address does not belong to user",ErrorCode.NOT_FOUND)
  }

  }
  catch(err){
throw new NotFoundException("Address Not found",ErrorCode.NOT_FOUND)
  }

}
const updatedUser=await prismaClient.user.update({
  where:{
    id:+userId
  },
  data:validatedData
})
return res.send(updatedUser)
}