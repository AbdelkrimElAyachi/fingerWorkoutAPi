import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from 'bcryptjs'

// sample controller - it will be executed after the JWT validation.
export const getProfile = async (req: any, res: Response) => {
    const usr = await User.findById(req.user.userId);
    if(!usr){
        return res.status(400).json({success:false, message:"user not found"});
    }
    res.status(200).json({success:true, user: usr, userId: req.userId })
}

export const updateProfile = async (req:any, res:Response) => {
    console.log(req.user.userId);
    
    const usr = await User.findById(req.user.userId);

    const {name, email} = req.body;
    if(!usr){
        return res.status(400).json({success:false, message:"user not found"});
    }

    usr.name = name;
    usr.email = email;

    if(req.body.password){
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        usr.password = hashedPassword;
    }
    if(req.file){
        usr.picture = req.file.filename;
    }

    await usr.save();

    return res.status(200).json({success:true, message:"Profile was updated succefully", user:usr})
}

export const uploadPicture  = (req:any, res:any) => {
    if(!req.file){
        return res.status(400).json({success:false,message:"No file uploaded."});
    }

    res.status(200).json({
        success: true,
        filename: req.file.filename,
        originalName: req.file.originalname
    })
};