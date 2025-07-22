// auth middleware

import { NextFunction,Request,Response } from "express"
import CustomError from './error-handler.middleware'
import {decodeJWTToken} from '../utils/jwt.utils'
import User from "../models/user.model"
import { Role} from '../types/global.types'

export const authenticate =(roles?:Role[]) =>{
    return async(req:Request,res:Response,next:NextFunction) =>{
      try{
        // 1.get token from req (req.cookie)

        const token = req.cookies.access_token
        if(!token){
          throw new CustomError('Unauthorized.Access denied',401)
        }

        const decodedData = decodeJWTToken(token)

        if(!decodedData){
          throw new CustomError('Unauthorized.Access denied',401)
        }

        if(decodedData.exp * 1000 < Date.now()){
          res.clearCookie('access_token',{
            httpOnly:true
          })
          throw new CustomError('Token Expired.Access denied',401)

        }

        // ? check if same user exists or not

        const user = await User.findOne({email:decodedData.email})

        if(!user){
          throw new CustomError('Unauthorized.Access denied',401)
        }

        // check if user role is valid or not
        if(roles && !roles.includes(user.role)){
          throw new CustomError('Forbidden.Access denied',403)
        }

        req.user = {
          _id:user._id,
          role:user.role,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
        }

        next()

        }catch(err){
        next(err)
      }

    }
}



// crud category 
// crud product

// ecom 
// daraz
// end-user - (customer [USER])
// getall category/products, add cart, add to wishlist,place order , review/ rate product
// super admin (SUPER_ADMIN)
// add,update,delete product & category,add new admin , update , delete admin
// admin user - (ADMIN)
// add,update,delete product & category ,order, payment



// middleware: function -> req-res - cycle -> execute (req,res,next), 
// common logic -> middleware

// req -> server (...middlewares) ->app.use(..routes)  -> controller(end)
// auth middleware

// example: create category -> post req. (token)

// user w/0 login post 
// jwt -> token (cookie, res)
// email,role ,id 

// middleware
// function(req,res,next)
// 1.req -> token ,  !token -> user not logged in -> error send -> 
// 2. jwt.sign({email,role ,id },{expiresIn:'1d'}) -> generate token
//  jwt.verify(token)  -> {email,role ,id , iat,exp} (seconds)
// res.json()
// 3.const user = User.find(id) -> 
// !user -> res.end()
// 4. exp < currentTime -> inValid
//  exp > currentTime -> valid //! -> res.end()



// 5.
// role -> USER () access denied
//? res.end()
// !ADMIN or SUPER_ADMIN 
// role -> ADMIN , SUPER_ADMIN -> access 
// next()


// application 
// app.use(middleware)

// route level
// route.get() //? not required
// route.get(id) //? not required
// route.post() //?protected
// route.put() //?protected
// route.delete() //?protected
// 



