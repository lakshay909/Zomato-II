import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginUser from './LoginUser'
import RegisterUser from './RegisterUser'
import LoginPartner from './LoginPartner'
import RegisterPartner from './RegisterPartner'
import Home from '../general/home'
import Profile from '../food-partner/profile'
import CreateFood from '../food-partner/CreateFood'

export const AppRoute = () => {
  return (
    <Router>
        <Routes>
            <Route path="/user/register" element={<RegisterUser/>} />
            <Route path="/user/login" element={<LoginUser/>} />
            <Route path="/food-partner/register" element={<RegisterPartner/>} />
            <Route path="/food-partner/login" element={<LoginPartner/>} />
            <Route path="/" element={<Home/>} />
            <Route path='/createFood' element={<CreateFood />} />
            <Route path='/food-partner/:id' element={<Profile />} />
        </Routes>
    </Router>
  )
}

export default AppRoute