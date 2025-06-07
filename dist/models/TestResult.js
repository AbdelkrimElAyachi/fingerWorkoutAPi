"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TestResultSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
    numberWrongCharacters: {
        type: Number,
        required: true,
    },
    numberCorrectCharacters: {
        type: Number,
        required: true,
    },
    numberWrongWords: {
        type: Number,
        required: true,
    },
    numberCorrectWords: {
        type: Number,
        required: true,
    },
    datetime: {
        type: Date,
        required: true,
    }
});
TestResultSchema.index({ userId: 1, datetime: -1 });
const TestResult = (0, mongoose_1.model)('TestResult', TestResultSchema);
exports.default = TestResult;
