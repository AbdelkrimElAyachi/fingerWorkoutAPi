import express from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';


import { connectDB } from './db/connect';
import { notFound } from './middleware/not-found';
import { errorHandlerMiddleware } from './middleware/error-handler';
import { uploadDir } from "./mutlter";

// routes
import authRoute from './routes/auth';
import protectedRoutes from './routes/protected';

const app = express();

dotenv.config();

const port = process.env.PORT || 3000;

const corsOptions:CorsOptions = {
    origin: ['http://localhost:5173','http://localhost:4000'], // frontend urls (developpement, production)
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}

// middleware
// In your main.ts
app.use(cors(corsOptions));
app.use('/api/json',express.json());

// Routes
app.use('/api/json/user', authRoute);
app.use('/api', protectedRoutes); // just for example

// serve uploads files (mostly user profile pictures)
app.use('/api/uploads', express.static(uploadDir));

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