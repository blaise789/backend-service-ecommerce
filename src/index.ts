import express, { query } from "express"
import { PORT } from "./secret"
import authRoutes from "./routes/auth.routes"
import { PrismaClient } from "@prisma/client"
import { SignUpSchema } from "./schema/users"
import { errorMiddleware } from "./middlewares/error.middleware"
import { authMiddleware } from "./middlewares/auth.middleware"
import productRoutes from "./routes/auth.routes"
const app=express()
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("hello world")
})
export const prismaClient=new PrismaClient({
    log:['query']
}
    
)
// .$extends({
//     query:{
//         user:{
//             create({args,query}){
//                 args.data=SignUpSchema.parse(args.data)
//                 return query(args)
//             }
//         }
//     }
// })

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/products",productRoutes)
app.use("/api/v1/me",authMiddleware,(req,res)=>{
    res.send("hello world")
})
// app.use("/api/v1/")
app.use(errorMiddleware)
app.listen(PORT || 4000,()=>{
console.log(`the server is running on port ${PORT}`)    
})