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
exports.removeImages = void 0;
const cloudinary_1 = require("cloudinary");
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// function to delete cloudinary images
const removeImages = (public_Ids) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        public_Ids.forEach((public_id) => __awaiter(void 0, void 0, void 0, function* () {
            yield cloudinary_1.v2.uploader.destroy(public_id);
        }));
        return true;
    }
    catch (error) {
        throw new error_handler_middleware_1.default("Something went wrong", 500);
    }
});
exports.removeImages = removeImages;
exports.default = cloudinary_1.v2;
