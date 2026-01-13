import React from 'react'

const RegisterUser = () => {
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand">U</div>
          <div>
            <div className="auth-title">Create an account</div>
            <div className="auth-sub">Register as a user</div>
          </div>
        </div>

        <form className="auth-form" onSubmit={(e)=>e.preventDefault()}>
          <div className="field">
            <label className="label">Full name</label>
            <input className="input" type="text" placeholder="Jane Doe" />
          </div>

          <div className="field">
            <label className="label">Email</label>
            <input className="input" type="email" placeholder="you@example.com" />
          </div>

          <div className="field">
            <label className="label">Password</label>
            <input className="input" type="password" placeholder="Create a password" />
          </div>

          <div className="row">
            <button className="btn" type="submit">Create account</button>
            <button className="btn ghost" type="button">Sign in</button>
          </div>
        </form>

        <div className="meta">By continuing you agree to the terms.</div>
      </div>
    </div>
  )
}

export default RegisterUser
