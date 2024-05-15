import express, { query } from "express"
import { PORT } from "./secret"
import authRoutes from "./routes/auth.routes"
import { PrismaClient } from "@prisma/client"
const app=express()
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("hello world")
})
export const prismaClient=new PrismaClient({
    log:['query']
}
    
)
app.use("/api/v1/auth",authRoutes)
// app.use("/api/v1/")
app.listen(PORT || 4000,()=>{
console.log(`the server is running on port ${PORT}`)    
})