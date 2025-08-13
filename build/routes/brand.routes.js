"use strict";
// crud routes for brand
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/brand.routes.ts
const express_1 = __importDefault(require("express"));
const brand_controller_1 = require("../controllers/brand.controller");
const router = express_1.default.Router();
router.post("/", brand_controller_1.createBrand);
router.get("/", brand_controller_1.getBrands);
router.get("/:id", brand_controller_1.getBrand);
router.put("/:id", brand_controller_1.updateBrand);
router.delete("/:id", brand_controller_1.deleteBrand);
exports.default = router;
