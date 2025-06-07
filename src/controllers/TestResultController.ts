import { Request, Response } from "express";
import TestResult from "../models/TestResult";
import User from "../models/User";


// example
/*export const getProfile = async (req: any, res: Response) => {
    const usr = await User.findById(req.user.id);
    res.status(200).json({success:true, user: usr, userId: req.userId })
}
*/

//create -- create a test result after user finished test
export const createTestResult = async (req:any, res:Response) => {
    const usr = await User.findById(req.user.id);
    if(!usr){
        return res.status(400).json({success:false, message:"User not found"});
    }
    const {numberCorrectCharacters, numberCorrectWords, numberWrongCharacters, numberWrongWords} = req.body;
    const testResult = new TestResult({
        userId: usr.id,
        numberCorrectCharacters: numberCorrectCharacters,
        numberCorrectWords: numberCorrectWords,
        numberWrongCharacters: numberWrongCharacters,
        numberWrongWords: numberWrongWords
    });
    try{
        testResult.save();
        return res.status(200).json({success:true, message:"testResult created succefully", testResult: testResult})
    }
    catch(err){
        res.status(400).json({success:false,message:err})
    }
}