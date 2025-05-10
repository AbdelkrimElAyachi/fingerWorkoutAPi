import express from 'express';
import cors, { CorsOptions } from 'cors';
const app = express();
import { connectDB } from './db/connect';
import { notFound } from './middleware/not-found';
import { errorHandlerMiddleware } from './middleware/error-handler';
import authRoute from './routes/auth';
import protectedRoutes from './routes/protected';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;

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
app.use('/api/protected', protectedRoutes); // just for example
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