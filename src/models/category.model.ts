import mongoose from 'mongoose'

// category schema 
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        trim:true,
    },
    description:{
        type:String,
        trim:true   
    }
},{timestamps:true})



// creating mongoose model 
const Category = mongoose.model('category',categorySchema)

export default Category
