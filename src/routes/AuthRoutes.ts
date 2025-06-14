import { Router } from "express";
const router = Router();
import { registerUser, loginUser } from '../controllers/AuthController'
import { registerValidation } from "../middleware/register-validation";
import { loginValidation } from "../middleware/login-validation";

router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);

export default router