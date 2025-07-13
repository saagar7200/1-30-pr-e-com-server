import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.utils";
import Category from "../models/category.model";
import CustomError from "../middlewares/error-handler.middleware";



// post category
export const create = asyncHandler(async(req:Request,res:Response)=>{

    const {name,description} = req.body

    const category = await Category.create({name,description})

    if(!category){
        throw new CustomError('Something went wrong',500)
    }

    res.status(201).json({
        message:'Category created.',
        success:true,
        status:'success',
        data:category
    })

})


// get all categories
export const getAll = asyncHandler(async(req:Request,res:Response) =>{

    const {query} = req.query;
    const filter:Record<string,any> = {}


// query filter on category name and description
  if (query) {
    filter.$or = [
      {
        name: {
          $regex: query,
          $options: "i",
        },
      },
      {
        descrition: {
          $regex: query,
          $options: "i",
        },
      },
    ];
  }

    const categories = await Category.find(filter)

  
    res.status(200).json({
        message:'All category fetched',
        success:true,
        status:'success',
        data:categories
    })
    
})

// get by id
export const getById = asyncHandler(async(req:Request,res:Response)=>{
    // get id from req.params
    const {id} = req.params

    // get category by given id
    const category = await Category.findById(id)

    if(!category){
        throw new CustomError('Category not found',400)
    }

    res.status(200).json({
        message:`Category by id ${id} fetched`,
        success:true,
        status:'success',
        data:category
    })

})

// update category

export const update = asyncHandler(async(req:Request,res:Response) =>{
    
    // get category id from params
    const {id} = req.params

    // get body data to update
    const {name,description} = req.body

    // find category by id
    const category = await Category.findById(id)
    // const updatedCategory = await Category.findByIdAndUpdate(id,{name,description},{new:true})

    if(!category){
        throw new CustomError('category not found',400)
    }

    if(name){
        category.name = name
    }
    if(description){
        category.description = description
    }

    await category.save()

    res.status(200).json({
        message:'Category updated',
        data:category,
        success:true,
        status:'success'
    })

})


export const remove = asyncHandler(async(req:Request,res:Response) =>{

    const {id} = req.params

    const category = await Category.findByIdAndDelete(id)

    if(!category){
        throw new CustomError('Category not found',400)
    }

    res.status(200).json({
        message:'Category deleted',
        success:true,
        status:'success',
        data:null
    })


})