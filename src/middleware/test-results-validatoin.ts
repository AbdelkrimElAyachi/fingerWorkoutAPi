import { Response, NextFunction } from "express";

import { z } from "zod";
import TestResult from "../models/TestResult";
import User from "../models/User";

// zod Validations
const TestResultSchema = z.object({
    numberWrongCharacters: z.number().min(0),
    numberCorrectCharacters: z.number().min(0),
    numberWrongWords: z.number().min(0),
    numberCorrectWords: z.number().min(0),
    duration: z.number().min(1).max(10), // in minutes
    datetime: z.string().length(24)
}).strict();

export const testResultValidation = async (req: any, res: Response, next: NextFunction) => {
    // retrive the user
    const user = await User.findById(req.user.id);
    // validating using zod
    const parsed = TestResultSchema.safeParse(req.body);
    if (!parsed.success)
        res.status(400).send(parsed.error)
    else {
        const { email: emailFromBody } = req.body;
        // checking to see if the user is already registered
        const emailExist = await User.findOne({ email: emailFromBody })
        if (emailExist && user && emailExist._id.toString() !== user._id.toString())
            res.status(400).json({success:false, message:'Email already exists!!!'})
        else
            next();
    }
}