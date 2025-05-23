import { Router } from "express";
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { verify } from "../middleware/verify-token";
import { profileController } from "../controllers/protected";

const uploadDir = path.join(__dirname, '../uploads');
const upload = multer({dest: uploadDir})

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const router = Router();

// sample route - just put the verify middleware before any route here for JWT validation.
router.get('/profile', verify, profileController )

router.post('/upload', upload.single('file'), (req:any, res:any)=>{
    if(!req.file){
        return res.status(400).json({success:false,message:"No file uploaded."});
    }

    res.status(200).json({
        success: true,
        filename: req.file.filename,
        originalName: req.file.originalname
    })
});


export default router