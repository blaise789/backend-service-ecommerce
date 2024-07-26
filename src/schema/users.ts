 import {z} from "zod"
 export  const SignUpSchema=z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(6)
 })
 export const AddressSchema=z.object({
   lineOne:z.string(),
   lineTwo:z.string().nullable(),
   pincode:z.string().length(6),
   city:z.string(),
 })
 export const UpdateUserSchema=z.object({
  name:z.string(),
  defaultShippingAddress:z.number().nullable().optional(),
  defaultBillingAddress:z.number().nullable().optional()
})