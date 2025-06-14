import { Request, Response } from "express";
import TestResult from "../models/TestResult";
import User from "../models/User";


//create -- create a test result after user finished test
export const createTestResult = async (req:any, res:Response) => {
    const usr = await User.findById(req.user.userId);
    if(!usr){
        return res.status(400).json({success:false, message:"User not found"});
    }
    const {numberCorrectCharacters, numberCorrectWords, numberWrongCharacters, numberWrongWords, duration, datetime} = req.body;
    const testResult = new TestResult({
        userId: usr.id,
        numberCorrectCharacters: numberCorrectCharacters,
        numberCorrectWords: numberCorrectWords,
        numberWrongCharacters: numberWrongCharacters,
        numberWrongWords: numberWrongWords,
        duration: duration,
        datetime: datetime
    });
    try{
        testResult.save();
        return res.status(200).json({success:true, message:"testResult created succefully", testResult})
    }
    catch(err){
        res.status(400).json({success:false,message:err})
    }
}