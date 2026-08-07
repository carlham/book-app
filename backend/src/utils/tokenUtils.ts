import jwt, { SignOptions } from "jsonwebtoken"

const SECRET = process.env.JWT_ACCESS_SECRET || (() => { throw new Error("JWT_ACCESS_SECRET is not defined. ") })()
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || (() => { throw new Error("JWT_REFRESH_SECRET is not defined. ") })()


const ACCESS_EXPIRES_IN: SignOptions["expiresIn"] = (process.env.ACCESS_EXPIRES_IN || "15m") as NonNullable<SignOptions["expiresIn"]>
const REFRESH_EXPIRES_IN: SignOptions["expiresIn"] = (process.env.REFRESH_EXPIRES_IN || "7d") as NonNullable<SignOptions["expiresIn"]>


function createAccessToken(payload: object) {
    return jwt.sign(payload, SECRET, { expiresIn: ACCESS_EXPIRES_IN })
}

function createRefreshToken(payload: object) {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN })
}

function verifyAccessToken(token: string) {
    return jwt.verify(token, SECRET)
}

function verifyRefreshToken(token: string) {
    return jwt.verify(token, REFRESH_SECRET)
}

export default {
    createAccessToken,
    createRefreshToken, 
    verifyAccessToken,
    verifyRefreshToken
}