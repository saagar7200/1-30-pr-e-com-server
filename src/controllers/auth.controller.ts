


import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { compare, hash } from "../utils/bcrypt.utils";
import CustomError from "../middlewares/error-handler.middleware";
import { asyncHandler } from "../utils/async-handler.utils";
import { generateJWTToken } from "../utils/jwt.utils";

// register
export const register = asyncHandler(async(req:Request,res:Response,next:NextFunction) =>{
        // req.body
   
        const {email,full_name,password,phone_number} = req.body


        if(!password){

            throw new CustomError('Password is required.',400)  
        }
        // hashing user password
        const hashedPassword = await hash(password)


        // creating new user
        const user = await  User.create({email,full_name,password:hashedPassword,phone_number})

        // throw error 
        if(!user){
            throw new CustomError('Registration failed.Try again later.',500)
        }

        // success response
        res.status(201).json({
            message:'User registered',
            success:true,
            status:'success',
            data:user
        })

   

})



export const login = asyncHandler(async(req:Request,res:Response,next:NextFunction) =>{
  
        // body (email,password)
        const {email,password} = req.body

        if(!email){
            throw new CustomError('email is required',400)

        }

        if(!password){
            throw new CustomError('password is required',400)

        }

        // find user by email
        const user = await User.findOne({email})

        // if !user => error
        if(!user){
            throw new CustomError('email or password does not match',400)
        }

        // compare password
        const isPasswordMatched = await compare(password,user.password)


        // !match -> error
        if(!isPasswordMatched){

            throw new CustomError('email or password does not match',400)
           
        }

        // jwt token 
        const payload = {
            full_name:user.full_name,
            _id:user._id,
            role:user.role,
            email:user.email
        }

        const token = generateJWTToken(payload)

        console.log("👊 ~ auth.controller.ts:92 ~ login ~ token:", token)

        // category
        // products

        // login success
        res
        .status(200)
        .cookie('access_token',token,{
            httpOnly:true,
            maxAge:parseInt(process.env.COOKIE_EXPIRES_IN ?? '1') * 24 * 60 * 60 * 1000 ,
            secure: false
        })
        .json({
            message:'Login success',
            success:true,
            status:'success',
            data:{
                user,
                access_token:token
            }
        })


   
})




