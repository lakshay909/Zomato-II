import React from 'react'

const LoginUser = () => {
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand">U</div>
          <div>
            <div className="auth-title">Welcome back</div>
            <div className="auth-sub">Sign in to your user account</div>
          </div>
        </div>

        <form className="auth-form" onSubmit={(e)=>e.preventDefault()}>
          <div className="field">
            <label className="label">Email</label>
            <input className="input" type="email" placeholder="you@example.com" />
          </div>

          <div className="field">
            <label className="label">Password</label>
            <input className="input" type="password" placeholder="••••••••" />
          </div>

          <div className="row">
            <button className="btn" type="submit">Sign in</button>
            <button className="btn ghost" type="button">Forgot?</button>
          </div>
        </form>

        <div className="meta">Don't have an account? Create one at /user/register</div>
      </div>
    </div>
  )
}

export default LoginUser
