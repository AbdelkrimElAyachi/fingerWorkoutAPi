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
exports.getTopTestResult = exports.getTestResults = exports.createTestResult = void 0;
const TestResult_1 = __importDefault(require("../models/TestResult"));
const User_1 = __importDefault(require("../models/User"));
const mongoose_1 = __importDefault(require("mongoose"));
const createTestResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usr = yield User_1.default.findById(req.user.userId);
    if (!usr) {
        return res.status(400).json({ success: false, message: "User not found" });
    }
    const { numberCorrectCharacters, numberCorrectWords, numberWrongCharacters, numberWrongWords, duration, datetime } = req.body;
    const testResult = new TestResult_1.default({
        userId: usr.id,
        numberCorrectCharacters: numberCorrectCharacters,
        numberCorrectWords: numberCorrectWords,
        numberWrongCharacters: numberWrongCharacters,
        numberWrongWords: numberWrongWords,
        duration: duration,
        datetime: datetime
    });
    try {
        testResult.save();
        return res.status(200).json({ success: true, message: "testResult created succefully", testResult });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err });
    }
});
exports.createTestResult = createTestResult;
const getTestResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const usr = yield User_1.default.findById(userId);
    if (!usr) {
        return res.status(400).json({ success: false, message: "User not found" });
    }
    const filter = { userId };
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const testResults = yield TestResult_1.default.find(filter).skip(skip).limit(limit);
        const total = yield TestResult_1.default.countDocuments(filter);
        const pages = Math.ceil(total / limit);
        return res.status(200).json({ success: true, message: "Test Results retrieved succefully", data: testResults, total, pages, page, limit });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err });
    }
});
exports.getTestResults = getTestResults;
const getTopTestResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const usr = yield User_1.default.findById(userId);
    if (!usr) {
        return res.status(400).json({ success: false, message: "User not found" });
    }
    const aggregationFilter = [
        {
            $match: { userId: new mongoose_1.default.Types.ObjectId(userId) }
        },
        {
            $addFields: {
                wpm: { $divide: ['$numberCorrectWords', '$duration'] }
            }
        },
        {
            $sort: { wpm: -1 }
        },
        {
            $limit: 1
        }
    ];
    try {
        const testResults = yield TestResult_1.default.aggregate(aggregationFilter);
        return res.status(200).json({ success: true, message: "Test Results retrieved succefully", data: testResults });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err });
    }
});
exports.getTopTestResult = getTopTestResult;
