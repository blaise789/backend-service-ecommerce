import { NextFunction, Request, Response } from "express"
import createProductSchema from "../schema/product"
import { prismaClient } from ".."
import { UnprocessableEntity } from "../exceptions/validation"
import { ErrorCode, HttpException } from "../exceptions/root"
import { any } from "zod"
import { NotFoundException } from "../exceptions/not-found.exception"

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const parsedData = createProductSchema.safeParse(req.body)
    if (!createProductSchema.safeParse(req.body).success)
        return next(new UnprocessableEntity(parsedData.error?.issues, "error in validation", ErrorCode.UNPROCESSABLE_ENTITY))

    console.log(req.body)

    const product = await prismaClient.product.create({
        data: {
            ...req.body,
            tags: req.body.tags?.join(",")

        }
    })
    console.log(product)
    res.json(product)

}
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = req.body
        if (product.tags) {
            product.tags = product.tags.join(",")
            // because it is a type of text
        }
        const updatedProduct = await prismaClient.product.update({
            where: {
                id: +req.params.id
            },
            data: product

        })

        res.json(updatedProduct)

        // console.log(req.body.tags)
    }
    catch (err: any) {
        next(new NotFoundException(err.message, ErrorCode.NOT_FOUND))


    }

}
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = req.params.id
        const product = await prismaClient.product.delete({
            where: {
                id: parseInt(productId)
            }
        })

        res.json({ "message": "product deleted successfully" })

    }
    catch (err: any) {
        next(new NotFoundException("product not found", ErrorCode.NOT_FOUND))

    }

}
export const findProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = req.params.id
        const product = await prismaClient.product.findFirstOrThrow({
            where: {
                id: +productId
            }
        })
        return res.json(product)


    }
    catch (err: any) {
        next(new NotFoundException("product not found", ErrorCode.NOT_FOUND))
    }

}
export const listProducts = async (req: Request, res: Response, next: NextFunction) => {
    const count = await prismaClient.product.count()
    const skip = req.query.skip as string

    const products = await prismaClient.product.findMany({
        skip: +skip || 0,
        take: 5
    })
    res.json({ count, products })
}
export const searchProducts = async (req: Request, res: Response) => {
    const products = await prismaClient.product.findMany({
        where: {
            name: {
                search: req.query.q.toString()
            },
            description:{
                search:req.query.q.toString()
            },
            tags:{
                search:req.query.q.toString()
            }



        }
    })
    res.json(products)

}