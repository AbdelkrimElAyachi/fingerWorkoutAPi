declare namespace Express {
    export interface Request {
        // For attaching to request
        userId?: string | Types.ObjectId,
        user?: string | Object
    }
}