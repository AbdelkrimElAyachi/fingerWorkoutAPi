"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDir = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
exports.uploadDir = path_1.default.join(__dirname, '../uploads');
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, exports.uploadDir);
    },
    filename: function (req, file, cb) {
        const ext = path_1.default.extname(file.originalname);
        const uniqueName = (0, uuid_1.v4)();
        cb(null, uniqueName + ext);
    }
});
const upload = (0, multer_1.default)({ storage });
if (!fs_1.default.existsSync(exports.uploadDir)) {
    fs_1.default.mkdirSync(exports.uploadDir, { recursive: true });
}
exports.default = upload;
