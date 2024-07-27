import e, { NextFunction, Request, Response } from "express";
import { ChangeQuantitySchema, CreateCartSchema } from "../schema/cart";
import { prismaClient } from "..";
import { RequestWithUser } from "../types/reqWithUser";
import { Product } from "@prisma/client";
import { NotFoundException } from "../exceptions/not-found.exception";
import { ErrorCode } from "../exceptions/root";
import { UnAuthorizedException } from "../exceptions/unauthorized.exception";

export const addItemToCart = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    let product: Product
    const validatedData = CreateCartSchema.parse(req.body)
    product = await prismaClient.product.findFirst({
        where: {
            id: validatedData.productId
        }
    })
    if (!product) {
        throw new NotFoundException("product does not exist", ErrorCode.NOT_FOUND)
    }

    const cartItemExists = await prismaClient.cartItem.findFirst({
        where: {
            productId: validatedData.productId
        }
    })
    if (cartItemExists) {
        cartItemExists.quantity += validatedData.quantity
        await prismaClient.cartItem.update({
            where: {
                id: cartItemExists.id
            },
            data: cartItemExists
        })

        return res.json({ "updateCart": cartItemExists })
    }

    const cartItem = await prismaClient.cartItem.create({
        data: {
            productId: product.id,
            quantity: validatedData.quantity,
            userId: req.user.id
        }
    })
    res.json(cartItem)

}




export const deleteItemFromCart = async (req: RequestWithUser, res: Response) => {


    const ItemExists = await prismaClient.cartItem.findFirst({
        where: {
            id: +req.params.id
        }
    })
    if (!ItemExists) {
        throw new NotFoundException("cart Item does not exist", ErrorCode.NOT_FOUND)

    }
    else if (ItemExists.userId != req.user.id) {
        throw new UnAuthorizedException("the cart Item does not belong to you", ErrorCode.NOT_FOUND)
    }
    await prismaClient.cartItem.delete({
        where: {
            id: +req.params.id
        }
    })
    res.json({ success: "true" })

}
export const changeQuantity = async (req: Request, res: Response) => {
    const validatedData = ChangeQuantitySchema.parse(req.body)
    const updatedCart = await prismaClient.cartItem.update({
        where: {
            id: +req.params.id
        },
        data: {
            quantity: validatedData.quantity
        }
    })
    res.json(updatedCart)
}
export const getCart = async (req: RequestWithUser, res: Response) => {
    const cart = await prismaClient.cartItem.findMany({
        where: {
            userId: +req.user.id
        },
        include: {
            product: true
        }
    })
    res.json(cart)
}