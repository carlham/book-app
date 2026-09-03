import { createContext, useContext, useState, useRef, useEffect, PropsWithChildren } from "react";

interface UserProfile {
    id: string
    name: string
    email: string
    role: "admin" | "user"
}

interface LoginResponse {
    accessToken: string
    user: UserProfile
}

interface AppErrorType {
    error: string
    success: boolean
}

interface AccessTokenType {
    accessToken: string
}

interface AuthContextType {
    accessToken: string | null
    loading: boolean
    user: UserProfile | null
    login: (email: string, password: string) => Promise<LoginResponse>
    logout: () => Promise<void>
}
const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: PropsWithChildren) {
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<UserProfile | null>(null)
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
                    await getMe(data.accessToken)
                    scheduleRefresh()
                } else {
                    setAccessToken(null)
                    setUser(null)
                }
            } catch (err) {
                setAccessToken(null)
                setUser(null)
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
                    setUser(null)
                }
            } catch (error) {
                setAccessToken(null)
                setUser(null)
            }

        }, 14 * 60 * 1000) //14 minutes
    }

    const getMe = async (accessToken: string) => {
        const res = await fetch("/api/me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            credentials: "include"
        })

        if (!res.ok) {
            const error = await res.json() as AppErrorType
            throw new Error(error.error || "Request failed")
        }
        const data = await res.json() as UserProfile
        setUser(data)
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
        const data = await res.json() as LoginResponse
        const user = data.user
        setAccessToken(data.accessToken)
        scheduleRefresh()
        setUser(user)
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
            setUser(null)
        }
    }

    const authValue = {
        accessToken,
        loading,
        login,
        logout,
        user
    }

    return (
        <AuthContext.Provider value={authValue} >
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