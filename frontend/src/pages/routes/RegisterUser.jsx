import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { BACKEND_URL } from '../../config'

const RegisterUser = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    const payload = { fullName, email, password }
    axios.post(`${BACKEND_URL}/api/auth/user/register`, payload,{ withCredentials: true })
      .then(res => setMessage({ type: 'success', text: res?.data?.message || 'Registered successfully' }))
      .catch(err => setMessage({ type: 'error', text: err?.response?.data?.error || err.message || 'Request failed' }))
      .then(() => setLoading(false))

    navigate('/')
  }

  const navigate = useNavigate()
  const location = useLocation()

  const handleSwitch = () => {
    const parts = location.pathname.split('/').filter(Boolean)
    const mode = parts[1] || 'register'
    navigate(`/food-partner/${mode}`)
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand">U</div>
          <div>
            <div className="auth-title">Create an account</div>
            <div className="auth-sub">Register as a user</div>
          </div>
          <div style={{marginLeft:'auto'}}>
            <button className="btn ghost" type="button" onClick={handleSwitch}>Switch to Partner</button>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Full name</label>
            <input className="input" value={fullName} onChange={e=>setFullName(e.target.value)} type="text" placeholder="Jane Doe" />
          </div>

          <div className="field">
            <label className="label">Email</label>
            <input className="input" value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@example.com" />
          </div>

          <div className="field">
            <label className="label">Password</label>
            <input className="input" value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Create a password" />
          </div>

          <div className="row">
            <button className="btn" type="submit" disabled={loading}>{loading? 'Saving...' : 'Create account'}</button>
            <button className="btn ghost" type="button" onClick={()=>navigate('/user/login')}>Sign in</button>
          </div>
        </form>

        {message && (
          <div className="meta" style={{color: message.type === 'error' ? '#ef4444' : 'var(--muted)'}}>{message.text}</div>
        )}
      </div>
    </div>
  )
}

export default RegisterUser
