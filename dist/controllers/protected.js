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
exports.uploadPicture = exports.updateProfile = exports.profileController = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const profileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usr = yield User_1.default.findById(req.user.id);
    res.status(200).json({ success: true, user: usr, userId: req.userId });
});
exports.profileController = profileController;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usr = yield User_1.default.findById(req.user.id);
    const { name, email, password } = req.body;
    if (!usr) {
        return res.status(400).json({ success: false, message: "user not found" });
    }
    usr.name = name;
    usr.email = email;
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    usr.password = hashedPassword;
    if (req.file) {
        usr.picture = req.file.filename;
    }
    yield usr.save();
    return res.status(200).json({ success: true, message: "Profile was updated succefully", user: usr });
});
exports.updateProfile = updateProfile;
const uploadPicture = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded." });
    }
    res.status(200).json({
        success: true,
        filename: req.file.filename,
        originalName: req.file.originalname
    });
};
exports.uploadPicture = uploadPicture;
