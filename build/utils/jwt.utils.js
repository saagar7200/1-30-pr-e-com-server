"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeJWTToken = exports.generateJWTToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
const JWT_SECRET = process.env.JWT_SECRET || "";
const generateJWTToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};
exports.generateJWTToken = generateJWTToken;
const decodeJWTToken = (token) => {
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
};
exports.decodeJWTToken = decodeJWTToken;
