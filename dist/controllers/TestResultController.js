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
exports.createTestResult = void 0;
const TestResult_1 = __importDefault(require("../models/TestResult"));
const User_1 = __importDefault(require("../models/User"));
const createTestResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usr = yield User_1.default.findById(req.user.id);
    if (!usr) {
        return res.status(400).json({ success: false, message: "User not found" });
    }
    const { numberCorrectCharacters, numberCorrectWords, numberWrongCharacters, numberWrongWords } = req.body;
    const testResult = new TestResult_1.default({
        userId: usr.id,
        numberCorrectCharacters: numberCorrectCharacters,
        numberCorrectWords: numberCorrectWords,
        numberWrongCharacters: numberWrongCharacters,
        numberWrongWords: numberWrongWords
    });
    try {
        testResult.save();
        return res.status(200).json({ success: true, message: "testResult created succefully", testResult: testResult });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err });
    }
});
exports.createTestResult = createTestResult;
