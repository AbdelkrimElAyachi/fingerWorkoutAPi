import express from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';


import { connectDB } from './db/connect';
import { notFound } from './middleware/not-found';
import { errorHandlerMiddleware } from './middleware/error-handler';
import { uploadDir } from "./mutlter";

dotenv.config();

// routes
import AuthRoutes from './routes/AuthRoutes';
import UserRoutes from './routes/UserRoutes';
import TestRoutes from './routes/TestRoutes';

const app = express();


const port = process.env.PORT || 3000;

// for developement purposes accept the those local urls
const corsOptions:CorsOptions = {
    origin: ['http://localhost:5173','http://localhost:4000'], // frontend urls (developpement, production)
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(corsOptions));

// start the route for your controller with /api/json if you want to use json only 
// Otherwise if using files form data etc... don't
app.use('/api/json',express.json());

// Routes
app.use('/api/json', AuthRoutes);
app.use('/api', UserRoutes); // just for example
app.use('/api', TestRoutes); // just for example

// serve uploads files (mostly user profile pictures)
app.use('/api/uploads', express.static(uploadDir));

// in case the url does not exist
app.use(notFound)
// in case unexpected error happens
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