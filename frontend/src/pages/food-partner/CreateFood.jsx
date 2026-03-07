import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../../config'
import { useAuth } from '../../context/AuthContext'
import '../../styles/theme.css'
import './CreateFood.css'

const CreateFood = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleVideoChange = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    setVideoFile(file)
    const url = URL.createObjectURL(file)
    setVideoPreview(url)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      name,
      description,
      videoFile
    }
    console.log('Submitting food:', payload)
    // TODO: wire up API call using FormData
    setName('')
    setDescription('')
    setVideoFile(null)
    setVideoPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleLogout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/api/auth/foodPartner/logout`, { withCredentials: true })
    } catch(e) {
      console.error('Logout failed:', e)
    }
    logout()
    // Force a hard reload so that any cached data is completely erased from memory
    window.location.href = '/food-partner/login'
  }

  return (
    <main className="create-food-page">
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
        <button onClick={handleLogout} className="btn ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Logout
        </button>
      </div>

      <form className="create-food-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Create New Food</h1>

        <label className="field">
          <span className="field-label">Video</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="field-input"
            onChange={handleVideoChange}
          />
          {videoPreview && (
            <video className="video-preview" src={videoPreview} controls />
          )}
        </label>

        <label className="field">
          <span className="field-label">Name</span>
          <input
            type="text"
            className="field-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter food name"
            required
          />
        </label>

        <label className="field">
          <span className="field-label">Description</span>
          <textarea
            className="field-input textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description"
            rows={4}
            required
          />
        </label>

        <div className="actions">
          <button type="submit" className="btn primary">Create</button>
        </div>
      </form>
    </main>
  )
}

export default CreateFood