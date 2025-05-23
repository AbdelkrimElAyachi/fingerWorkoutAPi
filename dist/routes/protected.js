"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const verify_token_1 = require("../middleware/verify-token");
const protected_1 = require("../controllers/protected");
const uploadDir = path_1.default.join(__dirname, '../uploads');
const upload = (0, multer_1.default)({ dest: uploadDir });
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
const router = (0, express_1.Router)();
router.get('/profile', verify_token_1.verify, protected_1.profileController);
router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded." });
    }
    res.status(200).json({
        success: true,
        filename: req.file.filename,
        originalName: req.file.originalname
    });
});
exports.default = router;
