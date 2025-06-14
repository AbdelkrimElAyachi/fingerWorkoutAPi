import { Router } from "express";
import { verify } from "../middleware/verify-token";
import { updateProfileValidation } from "../middleware/update-profile-validation";
import { getProfile, updateProfile } from "../controllers/UserController";
import upload from "../mutlter";
const router = Router();

// sample route - just put the verify middleware before any route here for JWT validation.
router.get('/json/profile', verify, getProfile)
router.post('/profile/update', verify, upload.single('picture'), updateProfileValidation, updateProfile)

export default router