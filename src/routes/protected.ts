import { Router } from "express";
import { verify } from "../middleware/verify-token";
import { profileController } from "../controllers/protected";
import { updateProfileValidation } from "../middleware/update-profile-validation";
import { updateProfile } from "../controllers/protected";
import upload from "../mutlter";
const router = Router();

// sample route - just put the verify middleware before any route here for JWT validation.
router.get('/json/profile', verify, profileController)
router.post('/profile/update', verify, upload.single('picture'), updateProfileValidation, updateProfile)

export default router