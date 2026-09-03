import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";


export default function Header() {
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    console.log("Header auth state:", { user })

    /*
    handleLogout = async () => {
        try {
            await logout()
            navigate("/")
        } catch (error) {
            if (error instanceof Error) {
                console.error(error)
            }
        }
    }
        */

    return (
        <div>
            {user ? <p>Hello, {user.name} </p> : null}
        </div>
    )
}