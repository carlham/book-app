import { CookieOptions, Response } from "express"


function setRefreshCookie(res: Response, refreshToken: string) {
    const options: CookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/api/auth"
    }
    res.cookie("refreshToken", refreshToken, options)
}

function clearCookies(res: Response) {
    res.clearCookie("token", { path: "/api/auth" })
    res.clearCookie("refreshToken", { path: "/api/auth" })
}

export default { setRefreshCookie, clearCookies }