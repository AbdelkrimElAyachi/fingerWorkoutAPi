import { Response, Request } from "express";
import User from "../models/User";
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from "jsonwebtoken";

// Create a JWT utility file (src/utils/jwt.ts)
interface JwtPayload {
  userId: string;
}

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_LIFETIME || '1h';

export const generateToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN } as SignOptions
  );
};

// Now your auth controllers (src/controllers/auth.ts)
type RegisterRequestBody = {
    name: string;
    email: string;
    password: string;
};

type LoginRequestBody = {
    email: string;
    password: string;
};

export const registerUser = async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Store the user in db
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();
        
        // Generate token for immediate login after registration if desired
        const token = generateToken(user._id.toString());
        
        res.status(201).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err instanceof Error ? err.message : 'Registration failed'
        });
    }
};

export const loginUser = async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Create and assign a JWT
        const token = generateToken(user._id.toString());
        
        res.header('Authorization', `Bearer ${token}`).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err instanceof Error ? err.message : 'Login failed'
        });
    }
};