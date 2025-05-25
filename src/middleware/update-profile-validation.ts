import { Request, Response, NextFunction } from "express";

import { z } from "zod";
import User from "../models/User";

// zod Validations
const updateProfileSchema = z.object({
    name: z.string().min(5).max(255),
    email: z.string().min(6).email().max(255),
    password: z.string().min(6).max(255)
}).strict();

type RequestBody = {
    email: string;
}
export const updateProfileValidation = async (req: Request, res: Response, next: NextFunction) => {
    // validating using zod
    const parsed = updateProfileSchema.safeParse(req.body);
    if (!parsed.success)
        res.status(400).send(parsed.error)
    else {
        const { email: emailFromBody }: RequestBody = req.body;
        // checking to see if the user is already registered
        const emailExist = await User.findOne({ email: emailFromBody })
        if (emailExist)
            res.status(400).json({success:false, message:'Email already exists!!!'})
        else
            next();
    }
}