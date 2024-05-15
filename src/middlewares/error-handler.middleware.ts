import { NextFunction,Request,Response } from "express"
import { ErrorCode, HttpException } from "../exceptions/root"

export const handleError=(error:HttpException,req:Request,res:Response,next:NextFunction)=>{

    res.status(error.statusCode).json({
        message:error.message,
     errorCode:error.errorCode,
     errors:error.errors
    })
}
