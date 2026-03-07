import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useAuth } from '../context/AuthContext'
import '../styles/bottom-nav.css'

const BottomNav = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/api/auth/user/logout`, { withCredentials: true })
    } catch(e) {
      console.error('Logout failed:', e)
    }
    logout()
    // Force a hard reload so that any cached data is completely erased from memory
    window.location.href = '/user/login'
  }

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
      <NavLink 
        to="/" 
        className={({ isActive }) => `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}
        end
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5z" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <span>home</span>
      </NavLink>

      <NavLink 
        to="/saved" 
        className={({ isActive }) => `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <span>saved</span>
      </NavLink>

      <button onClick={handleLogout} className="bottom-nav__item" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>logout</span>
      </button>
    </nav>
  )
}

export default BottomNav
