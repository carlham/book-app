import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator"

export default (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const err = errors.array({ onlyFirstError: true })[0]
        const responseObject = {
            message: err.msg,
            item: "path" in err ? err.path : err.type,
        }
        return res.status(400).json({ errors: responseObject })
    }
    next()
}