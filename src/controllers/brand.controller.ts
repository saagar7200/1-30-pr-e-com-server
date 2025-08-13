
//brand apis

// create  (post)

// update (put)

// getAll brands (get)

// get by id (get)

// delete brand (delete)
// controllers/brand.controller.ts
import { Request, Response } from "express";
import Brand from "../models/brand.model";

export const createBrand = async (req: Request, res: Response) => {
  try {
    const brand = await Brand.create(req.body);
    res.status(201).json({ success: true, data: brand });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getBrands = async (req: Request, res: Response) => {
  try {
    const brands = await Brand.find();
    res.json({ success: true, data: brands });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBrand = async (req: Request, res: Response) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
       res.status(404).json({ success: false, message: "Brand not found" });
    }
    res.json({ success: true, data: brand });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBrand = async (req: Request, res: Response) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!brand) {
       res.status(404).json({ success: false, message: "Brand not found" });
    }
    res.json({ success: true, data: brand });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteBrand = async (req: Request, res: Response) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
       res.status(404).json({ success: false, message: "Brand not found" });
    }
    res.json({ success: true, message: "Brand deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
