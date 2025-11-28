import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../App'

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useContext(AuthContext)

  if (!isLoggedIn) {
    // redirect to login if not logged in
    return <Navigate to="/login" replace />
  }

  return element
}

export default ProtectedRoute
