import { Response, Request } from "express"

export const notFound = (_: Request, res: Response) => res.status(404).json({msg:"this URL does not exist"})