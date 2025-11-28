import React, { useState, createContext, useEffect } from 'react'
import LoginPage from './pages/auth/LoginPage'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CataloguePage from './pages/Catalogue/CataloguePage'
import ProtectedRoute from './components/commonComponent/ProtectedRoute'

export const AuthContext = createContext()

function App() {
  // initialize currentUser from localStorage so login survives refresh
  const initialUser = (() => {
    try {
      return localStorage.getItem('auth:currentUser') || null
    } catch (e) {
      return null
    }
  })()

  const [currentUser, setCurrentUser] = useState(initialUser)
  const [isLoggedIn, setIsLoggedIn] = useState(!!initialUser)

  // persist currentUser to localStorage so login survives refresh
  useEffect(() => {
    try {
      if (currentUser) localStorage.setItem('auth:currentUser', currentUser)
      else localStorage.removeItem('auth:currentUser')
    } catch (e) {
      // ignore storage errors
    }
  }, [currentUser])

  // keep isLoggedIn in sync with currentUser
  useEffect(() => {
    setIsLoggedIn(!!currentUser)
  }, [currentUser])

  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/catalogue" element={<ProtectedRoute element={<CataloguePage />} />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  )
}

export default App
