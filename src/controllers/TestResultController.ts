import { Request, Response } from "express";
import TestResult from "../models/TestResult";
import User from "../models/User";
import mongoose, { Mongoose, PipelineStage } from "mongoose";


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

export const getTestResults = async(req:any, res:Response) => {
    const userId = req.user.userId;

    const usr = await User.findById(userId);
    if(!usr){
        return res.status(400).json({success:false, message:"User not found"});
    }
    const filter = {userId}

    // get page and limit from query
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page-1) * limit;

    try{
        const testResults = await TestResult.find(filter).skip(skip).limit(limit);

        // 📊 total count of for frontend
        const total = await TestResult.countDocuments(filter);
        const pages = Math.ceil(total/limit);

        return res.status(200).json({success:true, message:"Test Results retrieved succefully",data:testResults, total, pages, page, limit});
    }
    catch(err){
        res.status(400).json({success:false, message:err});
    }
}

export const getTopTestResult = async(req:any, res:Response) => {
    const userId = req.user.userId;

    const usr = await User.findById(userId);
    if(!usr){
        return res.status(400).json({success:false, message:"User not found"});
    }
    const aggregationFilter : PipelineStage[] = [
        {
            $match: {userId : new mongoose.Types.ObjectId(userId)}
        },
        {
            $addFields: {
                wpm: {$divide: ['$numberCorrectWords','$duration']}
            }
        },
        {
            $sort: {wpm : <1 | -1> -1}
        },
        {
            $limit: 1
        }
    ];
    try{
        const testResults = await TestResult.aggregate(aggregationFilter);
        return res.status(200).json({success:true, message:"Test Results retrieved succefully",data:testResults});
    }
    catch(err){
        res.status(400).json({success:false, message:err});
    }
}