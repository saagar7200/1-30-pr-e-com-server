"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const global_types_1 = require("../types/global.types");
const userSchema = new mongoose_1.default.Schema({
    first_name: {
        type: String,
        required: [true, 'first_name is required'],
        trim: true,
    },
    last_name: {
        type: String,
        required: [true, 'last_name is required'],
        trim: true,
    },
    email: {
        required: [true, 'email is required'],
        type: String,
        unique: [true, 'user already exists with provided email']
    },
    password: {
        required: [true, 'password is required'],
        min: [6, 'password must be at least 6 char. long'],
        type: String
    },
    phone_number: {
        type: String,
    },
    wishlist: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'product'
        }
    ],
    role: {
        type: String,
        enum: Object.values(global_types_1.Role),
        default: global_types_1.Role.USER
    }
}, { timestamps: true });
const User = mongoose_1.default.model('user', userSchema);
exports.default = User;
