import { Request, Response } from "express";
import User from "../models/User";


// sample controller - it will be executed after the JWT validation.
export const profileController = async (req: any, res: Response) => {
    const usr = await User.findById(req.user.id);
    res.status(200).json({success:true, data:usr, user: req.user, userId: req.userId })
}