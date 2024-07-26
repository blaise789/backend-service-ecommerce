import { NextFunction, Request, Response } from "express"
import { ErrorCode, HttpException } from "../exceptions/root"
import { InternalException } from "../exceptions/internal.exception"
import { ZodError } from "zod"
import { UnprocessableEntity } from "../exceptions/validation"

export const errorHandler=(method:Function)=>{
    return   async(req:Request,res:Response,next:NextFunction)=>{
        try{
          await method(req,res,next)
        }
        catch(err:any){
            
            
            if(err instanceof HttpException){
                
                return next(err)

            }
            else if(err instanceof ZodError){
                err=new UnprocessableEntity(err.errors,err.message,ErrorCode.UNPROCESSABLE_ENTITY)
                return next(err)
            }
            err=new InternalException("something went wrong",err.message,ErrorCode.INTERNAL_EXCEPTION)
                 
            return next(err);

        }

    }
}