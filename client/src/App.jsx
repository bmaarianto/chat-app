"use client"

import { useContext, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import { Toaster } from "react-hot-toast"
import { AuthContext } from "../context/AuthContext"
import AnimatedBackground from "./components/AnimatedBackground"
import SplashScreen from "./components/SplashScreen"

const App = () => {
  const { authUser } = useContext(AuthContext)
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashFinish = () => {
    setShowSplash(false)
  }

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <AnimatedBackground />
      <Toaster />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
