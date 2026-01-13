import React from 'react'

const RegisterPartner = () => {
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand">P</div>
          <div>
            <div className="auth-title">Partner registration</div>
            <div className="auth-sub">Create your food-partner account</div>
          </div>
        </div>

        <form className="auth-form" onSubmit={(e)=>e.preventDefault()}>
          <div className="field">
            <label className="label">Business name</label>
            <input className="input" type="text" placeholder="My Restaurant" />
          </div>

          <div className="field">
            <label className="label">Email</label>
            <input className="input" type="email" placeholder="owner@biz.com" />
          </div>

          <div className="field">
            <label className="label">Password</label>
            <input className="input" type="password" placeholder="Create a password" />
          </div>

          <div className="row">
            <button className="btn" type="submit">Register</button>
            <button className="btn ghost" type="button">Sign in</button>
          </div>
        </form>

        <div className="meta">We'll review your information and get back to you.</div>
      </div>
    </div>
  )
}

export default RegisterPartner
