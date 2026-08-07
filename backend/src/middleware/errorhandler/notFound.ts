import { Request, Response, NextFunction } from "express"
import AppError from "../../utils/errorUtils"

export default function notFound(req: Request, res: Response, next: NextFunction) {
    next (new AppError("Route not found", 404))
}