// auth middleware

import { NextFunction,Request,Response } from "express"
import CustomError from './error-handler.middleware'
import {decodeJWTToken} from '../utils/jwt.utils'
import User from "../models/user.model"
import {JWTPayloadDecoded} from '../types/global.types'
export const authenticate =() =>{
    return async(req:Request,res:Response,next:NextFunction) =>{

      try{
        const token = req.cookies.access_token;
        // const token  = req.headers['authorization']
        if(!token){
            throw new CustomError('Unauthorized. Access denied',401)
        }

        // check validity of token 
        const decodedData = decodeJWTToken(token) as JWTPayloadDecoded

        if(!decodedData){
            throw new CustomError('Unauthorized. Access denied',401)
        }

        const user = await User.findOne({email:decodedData.email})

        if(!user){
            throw new CustomError('Unauthorized. Access denied',401)
        }

        if(decodedData.exp * 1000 < Date.now() ){
            res.clearCookie('access_token',{
                httpOnly:true
            })
            throw new CustomError('Unauthorized. Access denied',401)

        }

        next()

        console.log(decodedData)

        console.log(token)
      }catch(err){
        next(err)
      }

    }
}