import {Request, Response } from "express";
import { ChangeQuantitySchema, CreateCartSchema } from "../schema/cart";
import { prismaClient } from "..";
import { RequestWithUser } from "../types/reqWithUser";

export const createOrder=async(req:Request,res:Response)=>{
  
}
export const listOrders=async(req:Request,res:Response)=>{}
export const cancelOrder=async(req:Request,res:Response)=>{
    

}
export const getOrderById=async(req:RequestWithUser,res:Response)=>{
    
}