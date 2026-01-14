import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { BACKEND_URL } from '../../config'

const LoginPartner = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    axios.post(`${BACKEND_URL}/api/auth/foodPartner/login`, { email, password }, { withCredentials: true })
      .then(res => setMessage({ type: 'success', text: res?.data?.message || 'Logged in' }), navigate('/createFood'))
      .catch(err => setMessage({ type: 'error', text: err?.response?.data?.error || err.message || 'Login failed' }))
      .then(() => setLoading(false))
  }

  const navigate = useNavigate()
  const location = useLocation()

  const handleSwitch = () => {
    const parts = location.pathname.split('/').filter(Boolean)
    const mode = parts[1] || 'login'
    navigate(`/user/${mode}`)
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand">P</div>
          <div>
            <div className="auth-title">Partner sign in</div>
            <div className="auth-sub">Access your food-partner dashboard</div>
          </div>
          <div style={{marginLeft:'auto'}}>
            <button className="btn ghost" type="button" onClick={handleSwitch}>Switch to User</button>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <input className="input" value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="partner@vendor.com" />
          </div>

          <div className="field">
            <label className="label">Password</label>
            <input className="input" value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="••••••••" />
          </div>

          <div className="row">
            <button className="btn" type="submit" disabled={loading}>{loading? 'Signing...' : 'Sign in'}</button>
            <button className="btn ghost" type="button" onClick={()=>navigate('/food-partner/register')}>Register</button>
          </div>
        </form>

        {message && (
          <div className="meta" style={{color: message.type === 'error' ? '#ef4444' : 'var(--muted)'}}>{message.text}</div>
        )}
      </div>
    </div>
  )
}

export default LoginPartner
