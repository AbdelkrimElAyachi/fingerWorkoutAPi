import { Router } from "express";
const router = Router();

import { verify } from "../middleware/verify-token";
import { profileController } from "../controllers/protected";

// sample route - just put the verify middleware before any route here for JWT validation.
router.get('/', verify, profileController )

export default router