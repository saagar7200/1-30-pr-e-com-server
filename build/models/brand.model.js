"use strict";
// brand model 
// 1.name (required)
// 2. description (optional)
// 3. logo (optional)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// create mongoose schema
// create mongoose model form brand
// models/brand.model.ts
const mongoose_1 = __importDefault(require("mongoose"));
const brandSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Brand name is required"],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        trim: true,
    },
    logo: {
        path: { type: String },
        public_id: { type: String }
    }
}, { timestamps: true });
const Brand = mongoose_1.default.model("brand", brandSchema);
exports.default = Brand;
