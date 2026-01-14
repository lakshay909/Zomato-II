import React, { useState, useRef } from 'react'
import '../../styles/theme.css'
import './CreateFood.css'

const CreateFood = () => {
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

  return (
    <main className="create-food-page">
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