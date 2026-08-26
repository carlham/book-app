import { createContext, useContext, useState, useRef, useEffect, PropsWithChildren } from "react";

interface UserType {
    accessToken: string | null
    user: {
        id: string
        name: string
        email: string
        role: "admin" | "user"
    }
}

interface AppErrorType {
    error: string
    success: boolean
}

interface AccessTokenType {
    accessToken: string | null
}

interface AuthContextType {
    accessToken: string | null
    loading: boolean
    login: (email: string, password: string) => Promise<UserType>
    logout: () => Promise<void>
}
const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: PropsWithChildren) {
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const refreshTimer = useRef(0)

    //restore session on page load using refresh token cookie
    useEffect(() => {
        const restoreSession = async () => {
            try {
                const res = await fetch("/api/auth/refresh", {
                    method: "POST",
                    credentials: "include"
                })
                if (res.ok) {
                    const data = await res.json() as AccessTokenType
                    setAccessToken(data.accessToken)
                    scheduleRefresh()
                }
            } catch (err) {
                setAccessToken(null)
            } finally {
                setLoading(false)
            }
        }
        restoreSession()

        return () => clearTimeout(refreshTimer.current)
    }, [])

    const scheduleRefresh = () => {
        clearTimeout(refreshTimer.current)
        refreshTimer.current = setTimeout(async () => {
            try {
                const res = await fetch("/api/auth/refresh", {
                    method: "POST",
                    credentials: "include"
                })
                console.log("Token refreshed: ", res.ok)
                if (res.ok) {
                    const data = await res.json() as AccessTokenType
                    setAccessToken(data.accessToken)
                    scheduleRefresh()
                } else {
                    setAccessToken(null)
                }
            } catch (error) {
                setAccessToken(null)
            }

        }, 14 * 60 * 1000) //14 minutes
    }

    const login = async (email: string, password: string) => {
        const res = await fetch("/api/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password })
        })
        if (!res.ok) {
            const error = await res.json() as AppErrorType
            throw new Error(error.error || "Login failed")
        }
        const data = await res.json() as UserType
        setAccessToken(data.accessToken)
        scheduleRefresh()
        return data
    }

    const logout = async () => {
        clearTimeout(refreshTimer.current)
        try {
            await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include"
            })
        } finally {
            setAccessToken(null)

        }
    }

    return (
        <AuthContext.Provider value={{ accessToken, loading, login, logout }} >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}