import express, { query } from "express"
import { PORT } from "./secret"
import authRoutes from "./routes/auth.routes"
import { PrismaClient } from "@prisma/client"
import { errorMiddleware } from "./middlewares/error.middleware"
import productRoutes from "./routes/products.routes"
import userRoutes from "./routes/users.routes"
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
app.use("/api/v1/users/",userRoutes)

// app.use("/api/v1/")
app.use(errorMiddleware)
app.listen(PORT || 4000,()=>{
console.log(`the server is running on port ${PORT}`)    
})