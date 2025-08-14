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
exports.logout = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_utils_1 = require("../utils/bcrypt.utils");
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const async_handler_utils_1 = require("../utils/async-handler.utils");
const jwt_utils_1 = require("../utils/jwt.utils");
const nodemailer_utils_1 = require("../utils/nodemailer.utils");
const html_utils_1 = require("../utils/html.utils");
// register
exports.register = (0, async_handler_utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // req.body
    const { email, first_name, last_name, password, phone_number } = req.body;
    if (!password) {
        throw new error_handler_middleware_1.default("Password is required.", 400);
    }
    // hashing user password
    const hashedPassword = yield (0, bcrypt_utils_1.hash)(password);
    // creating new user
    const user = yield user_model_1.default.create({
        email,
        first_name,
        last_name,
        password: hashedPassword,
        phone_number,
    });
    // throw error
    if (!user) {
        throw new error_handler_middleware_1.default("Registration failed.Try again later.", 500);
    }
    yield (0, nodemailer_utils_1.sendMail)({ to: user.email, subject: 'Account Registered Successfully', html: (0, html_utils_1.account_registration_confirmation_html)(req, user) });
    // success response
    res.status(201).json({
        message: "User registered",
        success: true,
        status: "success",
        data: user,
    });
}));
exports.login = (0, async_handler_utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // body (email,password)
    const { email, password } = req.body;
    if (!email) {
        throw new error_handler_middleware_1.default("email is required", 400);
    }
    if (!password) {
        throw new error_handler_middleware_1.default("password is required", 400);
    }
    // find user by email
    const user = yield user_model_1.default.findOne({ email });
    // if !user => error
    if (!user) {
        throw new error_handler_middleware_1.default("email or password does not match", 400);
    }
    // compare password
    const isPasswordMatched = yield (0, bcrypt_utils_1.compare)(password, user.password);
    // !match -> error
    if (!isPasswordMatched) {
        throw new error_handler_middleware_1.default("email or password does not match", 400);
    }
    // jwt token
    const payload = {
        first_name: user.first_name,
        last_name: user.last_name,
        _id: user._id,
        role: user.role,
        email: user.email,
    };
    const token = (0, jwt_utils_1.generateJWTToken)(payload);
    console.log("👊 ~ auth.controller.ts:92 ~ login ~ token:", token);
    // category
    // products
    // login success
    res
        .status(200)
        .cookie("access_token", token, {
        httpOnly: true,
        maxAge: parseInt((_a = process.env.COOKIE_EXPIRES_IN) !== null && _a !== void 0 ? _a : "1") * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'development' ? false : true,
        sameSite: 'none'
    })
        .json({
        message: "Login success",
        success: true,
        status: "success",
        data: {
            user,
            access_token: token,
        },
    });
}));
exports.logout = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development' ? false : true,
        sameSite: 'none'
    }).status(200).json({
        message: 'Logged out successfully',
        success: true,
        status: 'success'
    });
}));
// 
