import { NextFunction, Request, Response } from "express"
import { ErrorCode, HttpException } from "../exceptions/root"
import { InternalException } from "../exceptions/internal.exception"

export const errorHandler=(method:Function)=>{
    return   async(req:Request,res:Response,next:NextFunction)=>{
        try{
          await method(req,res,next)
        }
        catch(err:any){
            
            
            if(err instanceof HttpException){
                
                return next(err)

            }

            err=new InternalException("something went wrong",err.issues,ErrorCode.INTERNAL_EXCEPTION)
                 
            return next(err);

        }

    }
}