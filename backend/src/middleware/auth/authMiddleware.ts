import jwt, { JwtPayload } from "jsonwebtoken"
import Session from "../../models/sessionModel.js"
import { Request, Response, NextFunction } from "express";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "something_not_so_secret"

type AuthPayload = JwtPayload & {
    userID: string
    refreshTokenID: string
    role: "admin" | "user"
}

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.get("authorization")

        if (!authHeader) {
            return res.status(401).json({ error: "Unauthorized - No token provided" })
        }

        const accessToken = authHeader.split(" ")[1]
        if (!accessToken) {
            return res.status(401).json({ error: "Unauthorized - No token provided" })
        }

        const decoded = jwt.verify(accessToken, JWT_ACCESS_SECRET) as AuthPayload

        const session = await Session.findOne({
            _id: decoded.refreshTokenID,
            userID: decoded.userID
        })

        if (!session) return res.status(401).json({ error: "Unauthorized - Invalid token" })

        req.userId = decoded.userID
        req.userRole = decoded.role
        req.sessionId = decoded.refreshTokenID

        next()
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized - Invalid token" })
    }
}
