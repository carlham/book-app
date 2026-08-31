import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { toast } from "react-toastify";


export default function Register() {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: ""
    })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match")
            setLoading(false)
            return
        }

        if (formData.password.length < 8) {
            setError("Password must contain more than 8 characters")
            setLoading(false)
            return
        }
        setLoading(true)

        try {
            const registeredUser = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            if (registeredUser.ok) {
                toast.success("Registration successful!")
                navigate("/login")
            } else {
                const data = await registeredUser.json()
                setError(data.message || "Registration failed")
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
                console.error(error)
            }
        } finally {
            setLoading(false)
        }
    }


    return (
        <div>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    className="register-container__form-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="register-container__form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="register-container__form-input"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    className="register-container__form-input"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading} >Register</button>
            </form>
            <p>Already have an account? <Link to="/login" >Login</Link></p>
        </div>
    )
}