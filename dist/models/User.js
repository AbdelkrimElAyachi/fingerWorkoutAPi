"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255
    },
    picture: {
        type: String,
        required: false,
        max: 255
    },
    EmailVerified: {
        type: Boolean,
        required: false,
        default: false
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now()
    }
});
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
