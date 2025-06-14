import { Router } from "express";
import { verify } from "../middleware/verify-token";
import { testResultValidation } from "../middleware/test-results-validatoin";
import { createTestResult } from "../controllers/TestResultController";

const router = Router();

router.post('/json/test/save', verify, testResultValidation, createTestResult)

export default router;