"use strict";
//brand apis
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBrand = exports.updateBrand = exports.getBrand = exports.getBrands = exports.createBrand = void 0;
const brand_model_1 = __importDefault(require("../models/brand.model"));
const createBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const brand = yield brand_model_1.default.create(req.body);
        res.status(201).json({ success: true, data: brand });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
exports.createBrand = createBrand;
const getBrands = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const brands = yield brand_model_1.default.find();
        res.json({ success: true, data: brands });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.getBrands = getBrands;
const getBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const brand = yield brand_model_1.default.findById(req.params.id);
        if (!brand) {
            res.status(404).json({ success: false, message: "Brand not found" });
        }
        res.json({ success: true, data: brand });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.getBrand = getBrand;
const updateBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const brand = yield brand_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!brand) {
            res.status(404).json({ success: false, message: "Brand not found" });
        }
        res.json({ success: true, data: brand });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
exports.updateBrand = updateBrand;
const deleteBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const brand = yield brand_model_1.default.findByIdAndDelete(req.params.id);
        if (!brand) {
            res.status(404).json({ success: false, message: "Brand not found" });
        }
        res.json({ success: true, message: "Brand deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.deleteBrand = deleteBrand;
