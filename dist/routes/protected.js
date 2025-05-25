"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verify_token_1 = require("../middleware/verify-token");
const protected_1 = require("../controllers/protected");
const update_profile_validation_1 = require("../middleware/update-profile-validation");
const protected_2 = require("../controllers/protected");
const mutlter_1 = __importDefault(require("../mutlter"));
const router = (0, express_1.Router)();
router.get('/profile', verify_token_1.verify, protected_1.profileController);
router.post('/profile/update', verify_token_1.verify, update_profile_validation_1.updateProfileValidation, mutlter_1.default.single('picture'), protected_2.updateProfile);
exports.default = router;
