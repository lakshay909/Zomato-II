import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import LoginUser from './LoginUser'
import RegisterUser from './RegisterUser'
import LoginPartner from './LoginPartner'
import RegisterPartner from './RegisterPartner'
import Home from '../general/home'
import Profile from '../food-partner/profile'
import CreateFood from '../food-partner/CreateFood'
import Saved from '../general/saved'
import { AuthProvider, useAuth } from '../../context/AuthContext'
import ProtectedRoute from './ProtectedRoute'

// Component to handle redirecting already logged-in users away from auth pages
const PublicRoute = ({ children }) => {
  const { user, role, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  
  if (user) {
    return <Navigate to={role === 'partner' ? '/createFood' : '/'} replace />;
  }
  return children;
};

export const AppRoute = () => {
  return (
    <AuthProvider>
      <Router>
          <Routes>
              {/* Public/Auth Routes - Redirect if already logged in */}
              <Route path="/user/register" element={
                <PublicRoute><RegisterUser/></PublicRoute>
              } />
              <Route path="/user/login" element={
                <PublicRoute><LoginUser/></PublicRoute>
              } />
              <Route path="/food-partner/register" element={
                <PublicRoute><RegisterPartner/></PublicRoute>
              } />
              <Route path="/food-partner/login" element={
                <PublicRoute><LoginPartner/></PublicRoute>
              } />

              {/* Protected User Routes */}
              <Route element={<ProtectedRoute allowedRoles={['user']} />}>
                <Route path="/" element={<Home/>} />
                <Route path="/saved" element={<Saved/>} />
              </Route>

              {/* Protected Partner Routes */}
              <Route element={<ProtectedRoute allowedRoles={['partner']} />}>
                <Route path='/createFood' element={<CreateFood />} />
                <Route path='/food-partner/:id' element={<Profile />} />
              </Route>
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </Router>
    </AuthProvider>
  )
}

export default AppRoute