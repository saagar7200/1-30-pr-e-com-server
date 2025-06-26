import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import CustomError, { errorHandler } from './middlewares/error-handler.middleware'
import { connectDb } from './config/db-connect'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'

// importing routes
import authRoutes from './routes/auth.routes'
import categoryRoutes from './routes/category.routes'
import productRoutes from './routes/product.routes'


const app = express()
const PORT = process.env.PORT  || 8080
const DB_URI = process.env.DB_URI ?? ''

// 

// connecting database
connectDb(DB_URI)

// using middlewares
// to set security headers / removes insecure headers
app.use(helmet())
// parse req cookie
app.use(cookieParser())
// parse url-encoded data
app.use(express.urlencoded({extended:true}))



// parse json data
app.use(express.json())

app.get('/',(req,res)=>{
   
    res.status(200).json({
        message:'Server is up & running'
    })
})


// using routes
app.use('/api/auth',authRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/product',productRoutes)



app.all('/{*spalt}',(req:Request,res:Response,next:NextFunction)=>{

    const message = `Can not ${req.method} on ${req.url}`

    const error = new CustomError(message,404)

    next(error)

})

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})

app.use(errorHandler)
