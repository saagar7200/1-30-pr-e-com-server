import mongoose from "mongoose";
import { Role } from "../types/global.types";


const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:[true, 'first_name is required'],
        trim:true,
    }, 
    last_name:{
        type:String,
        required:[true, 'last_name is required'],
        trim:true,
    },
    email:{
        required:[true,'email is required'],
        type:String,
        unique:[true,'user already exists with provided email']
    },
    password:{
        required:[true,'password is required'],
        min:[6,'password must be at least 6 char. long'],
        type:String
    },
    phone_number:{
        type:String,
    },
    wishlist:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'product'
        }
    ],
    role:{
        type:String,
        enum:Object.values(Role),
        default:Role.USER
    }
},{timestamps:true})

const User = mongoose.model('user',userSchema);

export default User