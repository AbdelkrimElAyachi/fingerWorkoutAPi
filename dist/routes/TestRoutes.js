"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verify_token_1 = require("../middleware/verify-token");
const test_results_validatoin_1 = require("../middleware/test-results-validatoin");
const TestResultController_1 = require("../controllers/TestResultController");
const router = (0, express_1.Router)();
router.post('/json/test/save', verify_token_1.verify, test_results_validatoin_1.testResultValidation, TestResultController_1.createTestResult);
exports.default = router;
