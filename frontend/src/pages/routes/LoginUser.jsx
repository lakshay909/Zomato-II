import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { BACKEND_URL } from '../../config'

const LoginUser = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    axios.post(`${BACKEND_URL}/api/auth/user/login`, { email, password }, { withCredentials: true })
      .then(res => setMessage({ type: 'success', text: res?.data?.message || 'Logged in' }))
      .catch(err => setMessage({ type: 'error', text: err?.response?.data?.error || err.message || 'Login failed' }))
      .then(() => setLoading(false))
    
    navigate('/')
  }

  const navigate = useNavigate()
  const location = useLocation()

  const handleSwitch = () => {
    const parts = location.pathname.split('/').filter(Boolean)
    const mode = parts[1] || 'login'
    navigate(`/food-partner/${mode}`)
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand">U</div>
          <div>
            <div className="auth-title">Welcome back</div>
            <div className="auth-sub">Sign in to your user account</div>
          </div>
          <div style={{marginLeft:'auto'}}>
            <button className="btn ghost" type="button" onClick={handleSwitch}>Switch to Partner</button>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <input className="input" value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@example.com" />
          </div>

          <div className="field">
            <label className="label">Password</label>
            <input className="input" value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="••••••••" />
          </div>

          <div className="row">
            <button className="btn" type="submit" disabled={loading}>{loading? 'Signing...' : 'Sign in'}</button>
            <button className="btn ghost" type="button" onClick={()=>navigate('/user/register')}>Create account</button>
          </div>
        </form>

        {message && (
          <div className="meta" style={{color: message.type === 'error' ? '#ef4444' : 'var(--muted)'}}>{message.text}</div>
        )}
      </div>
    </div>
  )
}

export default LoginUser
