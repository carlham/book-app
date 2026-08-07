import { NextFunction, Request, Response } from "express";

export function sanitizeAuthInput(req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
        req.body = {}
    }

    if (req.body.confirmPassword) {
        delete req.body.confirmPassword
    }
    next()

}

export default { sanitizeAuthInput }