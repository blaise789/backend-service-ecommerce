import {  z } from "zod";

const createProductSchema=z.object({
    name:z.string(),
    description:z.string().nullable(),
    price:z.number(),
    tags:z.array(z.string())
      
      

}  
)
export default createProductSchema