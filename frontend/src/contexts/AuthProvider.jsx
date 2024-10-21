import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  useEffect(() => {
    const authToken = localStorage.getItem("authToken")
    if (!authToken) {
      setIsAuthenticated(false)
    }
  }, [])

  const handleLogin = (authToken) => {
    localStorage.setItem("authToken", authToken)
    setIsAuthenticated(true)
  }

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("authToken")
    setIsAuthenticated(false)
    // Redirect to the login page
    navigate("/login")
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}
