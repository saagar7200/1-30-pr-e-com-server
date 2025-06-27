"use strict";
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
exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const async_handler_utils_1 = require("../utils/async-handler.utils");
const product_model_1 = __importDefault(require("../models/product.model"));
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const path_1 = __importDefault(require("path"));
exports.create = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { coverImage, images } = req.files;
    console.log(coverImage);
    if (!coverImage || coverImage.length === 0) {
        throw new error_handler_middleware_1.default("coverImage is required", 404);
    }
    const product = new product_model_1.default(data);
    product.coverImage = {
        path: coverImage[0].path,
        public_id: path_1.default.basename(coverImage[0].path),
    };
    if (images && images.length > 0) {
        const imagePath = images.map((image) => ({
            path: image.path,
            public_id: path_1.default.basename(image.path),
        }));
        product.images = imagePath;
    }
    yield product.save();
    res.status(201).json({
        status: "success",
        success: true,
        message: "Product created successfully",
        data: product,
    });
}));
exports.getAll = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.default.find();
    res.status(200).json({
        status: "success",
        success: true,
        message: "Products fetched successfully",
        data: products,
    });
}));
exports.getById = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield product_model_1.default.findById(id);
    if (!product) {
        throw new error_handler_middleware_1.default("Product not found", 404);
    }
    res.status(200).json({
        status: "success",
        success: true,
        message: "Product fetched successfully",
        data: product,
    });
}));
exports.update = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const product = yield product_model_1.default.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
    if (!product) {
        throw new error_handler_middleware_1.default("Product not found", 404);
    }
    res.status(200).json({
        status: "success",
        success: true,
        message: "Product updated successfully",
        data: product,
    });
}));
exports.remove = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield product_model_1.default.findByIdAndDelete(id);
    if (!product) {
        throw new error_handler_middleware_1.default("Product not found", 404);
    }
    res.status(200).json({
        status: "success",
        success: true,
        message: "Product deleted successfully",
        data: null,
    });
}));
