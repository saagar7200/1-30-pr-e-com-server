"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const authenticate_middleware_1 = require("../middlewares/authenticate.middleware");
const global_types_1 = require("../types/global.types");
const file_uploader_middleware_1 = require("../middlewares/file-uploader.middleware");
const upload = (0, file_uploader_middleware_1.uploader)();
const router = express_1.default.Router();
router.get("/", product_controller_1.getAll);
// get featured products
// /api/product/featured
router.get('/featured', product_controller_1.getFeaturedProducts);
// get products by category
router.get('/category/:categoryId', product_controller_1.getByCategory);
// /api/product/1
router.get("/:id", product_controller_1.getById);
router.post("/", (0, authenticate_middleware_1.authenticate)(global_types_1.onlyAdmin), upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "images", maxCount: 5 },
]), product_controller_1.create);
router.put("/:id", (0, authenticate_middleware_1.authenticate)(global_types_1.onlyAdmin), upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "images", maxCount: 5 },
]), product_controller_1.update);
router.delete("/:id", (0, authenticate_middleware_1.authenticate)(global_types_1.onlyAdmin), product_controller_1.remove);
exports.default = router;
