import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginUser from './LoginUser'
import RegisterUser from './RegisterUser'
import LoginPartner from './LoginPartner'
import RegisterPartner from './RegisterPartner'

export const AppRoute = () => {
  return (
    <Router>
        <Routes>
            <Route path="/user/register" element={<RegisterUser/>} />
            <Route path="/user/login" element={<LoginUser/>} />
            <Route path="/food-partner/register" element={<RegisterPartner/>} />
            <Route path="/food-partner/login" element={<LoginPartner/>} />
        </Routes>
    </Router>
  )
}

export default AppRoute