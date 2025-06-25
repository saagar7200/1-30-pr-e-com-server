import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "name is required"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "price is required"],
        min: [0, "price must be a positive number"]
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        required: [true, "category is required"]
    },
  
    stock: {
        type: Number,
        required: [true, "stock is required"],
        min: [0, "stock must be a positive number"]
    },
    isFeatured:{
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        trim: true
    },
},{timestamps: true});

const Product = mongoose.model('product', productSchema);

export default Product;