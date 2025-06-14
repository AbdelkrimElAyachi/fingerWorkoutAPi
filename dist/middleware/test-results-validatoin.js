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
exports.testResultValidation = void 0;
const zod_1 = require("zod");
const User_1 = __importDefault(require("../models/User"));
const TestResultSchema = zod_1.z.object({
    numberWrongCharacters: zod_1.z.number().min(0),
    numberCorrectCharacters: zod_1.z.number().min(0),
    numberWrongWords: zod_1.z.number().min(0),
    numberCorrectWords: zod_1.z.number().min(0),
    duration: zod_1.z.number().min(0).max(10),
    datetime: zod_1.z.string().length(24)
}).strict();
const testResultValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.user.id);
    const parsed = TestResultSchema.safeParse(req.body);
    if (!parsed.success)
        res.status(400).send(parsed.error);
    else {
        const { email: emailFromBody } = req.body;
        const emailExist = yield User_1.default.findOne({ email: emailFromBody });
        if (emailExist && user && emailExist._id.toString() !== user._id.toString())
            res.status(400).json({ success: false, message: 'Email already exists!!!' });
        else
            next();
    }
});
exports.testResultValidation = testResultValidation;
