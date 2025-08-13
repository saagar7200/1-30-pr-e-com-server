

// crud routes for brand

// routes/brand.routes.ts
import express from "express";
import {
  createBrand,
  getBrands,
  getBrand,
  deleteBrand,
  updateBrand,
} from "../controllers/brand.controller";

const router = express.Router();

router.post("/", createBrand);
router.get("/", getBrands);
router.get("/:id", getBrand);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);

export default router;
