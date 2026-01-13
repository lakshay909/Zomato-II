import React from 'react'

const LoginPartner = () => {
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand">P</div>
          <div>
            <div className="auth-title">Partner sign in</div>
            <div className="auth-sub">Access your food-partner dashboard</div>
          </div>
        </div>

        <form className="auth-form" onSubmit={(e)=>e.preventDefault()}>
          <div className="field">
            <label className="label">Email</label>
            <input className="input" type="email" placeholder="partner@vendor.com" />
          </div>

          <div className="field">
            <label className="label">Password</label>
            <input className="input" type="password" placeholder="••••••••" />
          </div>

          <div className="row">
            <button className="btn" type="submit">Sign in</button>
            <button className="btn ghost" type="button">Help</button>
          </div>
        </form>

        <div className="meta">New here? Register at /food-partner/register</div>
      </div>
    </div>
  )
}

export default LoginPartner
