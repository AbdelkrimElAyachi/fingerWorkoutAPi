import { Router } from "express";
import { verify } from "../middleware/verify-token";
import { testResultValidation } from "../middleware/test-results-validatoin";
import { createTestResult, getTestResults } from "../controllers/TestResultController";

const router = Router();

router.post('/json/test/save', verify, testResultValidation, createTestResult);
router.get('/json/test/all', verify, getTestResults);

export default router;