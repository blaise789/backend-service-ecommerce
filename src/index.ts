import express, { query } from "express"
import { PORT } from "./secret"
import authRoutes from "./routes/auth.routes"
import { PrismaClient } from "@prisma/client"
import { errorMiddleware } from "./middlewares/error.middleware"
import productRoutes from "./routes/products.routes"
import userRoutes from "./routes/users.routes"
import cartRoutes from "./routes/cart.routes"
import ordersRoutes from "./routes/orders.routes"
const app=express()
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("hello world")
})
export const prismaClient=new PrismaClient({
    log:['query']
}
    
)
.$extends({
    result:{
        address:{
         formattedAddress:{
            needs:{
                lineOne:true,
                lineTwo:true,
                city:true,
                country:true,
                pincode:true
            },
          compute:(addr)=>{
            return `${addr.lineOne},${addr.lineTwo},${addr.city},${addr.country},${addr.pincode}`
          }
         }
        }
    }

})

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/products",productRoutes)
app.use("/api/v1/users/",userRoutes)
app.use("/api/v1/cart",cartRoutes)
app.use("/api/v1/orders",ordersRoutes)
// app.use("/api/v1/")
app.use(errorMiddleware)
app.listen(PORT || 4000,()=>{
console.log(`the server is running on port ${PORT}`)    
})
// user management