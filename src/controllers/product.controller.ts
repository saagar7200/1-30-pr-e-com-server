import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.utils";
import Product from "../models/product.model";
import CustomError from "../middlewares/error-handler.middleware";



export const create = asyncHandler(async(req:Request,res:Response)=>{
    const data = req.body;
    const product = await Product.create(data)
    res.status(201).json({
        status:'success',
        success: true,
        message: "Product created successfully",
        data: product
    });

})

export const getAll = asyncHandler(async(req:Request,res:Response)=>{
    const products = await Product.find()

    res.status(200).json({
        status: 'success',
        success: true,
        message: "Products fetched successfully",
        data: products
    });
})

export const getById = asyncHandler(async(req:Request,res:Response)=>{
    const {id} = req.params;
    const product = await Product.findById(id)
    if(!product){
        throw new CustomError('Product not found', 404);
    }

    res.status(200).json({
        status: 'success',
        success: true,
        message: "Product fetched successfully",
        data: product
    });

})


export const update  = asyncHandler(async(req:Request,res:Response)=>{
    const {id} = req.params;
    const data = req.body;

    const product = await Product.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });

    if(!product){
        throw new CustomError('Product not found', 404);
    }

    res.status(200).json({
        status: 'success',
        success: true,
        message: "Product updated successfully",
        data: product
    });
})


export const remove = asyncHandler(async(req:Request,res:Response)=>{
    const {id} = req.params;
    
    const product = await Product.findByIdAndDelete(id);

    if(!product){
        throw new CustomError('Product not found', 404);
    }

    res.status(200).json({
        status: 'success',
        success: true,
        message: "Product deleted successfully",
        data: null
    });
})

