import { Request, Response } from "express";

import express from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const app = express();
import { connectDB } from './db/connect';
import { notFound } from './middleware/not-found';
import { errorHandlerMiddleware } from './middleware/error-handler';

// routes
import authRoute from './routes/auth';
import protectedRoutes from './routes/protected';


dotenv.config();
const port = process.env.PORT || 3000;
const upload = multer({dest: uploadDir})

const corsOptions:CorsOptions = {
    origin: ['http://localhost:5173'], // frontend urls (developpement, production)
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}

// middleware
// In your main.ts
app.use(cors(corsOptions));
app.use(express.json())

// Routes
app.use('/api/user', authRoute);
app.use('/api', protectedRoutes); // just for example

app.post('/api/upload', upload.single('file'), (req:Request, res:Response)=>{
    if(!req.file){
        return res.status(400).json({success:false,message:"No file uploaded."});
    }

    res.status(200).json({
        success: true,
        filename: req.file.filename,
        originalName: req.file.originalname
    })
});

app.use(notFound)
app.use(errorHandlerMiddleware)


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server listening on port ${port}...`))
    } catch (err) {
        console.log(err);
    }
}

start()