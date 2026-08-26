import { createBrowserRouter } from "react-router"
import Login from "../pages/login/Login"
import Home from "../pages/home/Home"
import Register from "../pages/register/Register"
import BooksList from "../pages/books-list/BooksList"

/*
const ProtectedRoute = () => {
    const { accessToken } = useAuth()

    return accessToken ? <Outlet /> : <Navigate to="/login" />
}
*/

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/books",
        element: <BooksList />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
])

export default router