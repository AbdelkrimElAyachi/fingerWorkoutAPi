"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verify_token_1 = require("../middleware/verify-token");
const UserController_1 = require("../controllers/UserController");
const update_profile_validation_1 = require("../middleware/update-profile-validation");
const mutlter_1 = __importDefault(require("../mutlter"));
const router = (0, express_1.Router)();
router.get('/json/profile', verify_token_1.verify, UserController_1.getProfile);
router.post('/profile/update', verify_token_1.verify, mutlter_1.default.single('picture'), update_profile_validation_1.updateProfileValidation, UserController_1.updateProfile);
exports.default = router;
