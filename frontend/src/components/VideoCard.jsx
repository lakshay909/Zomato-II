import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import '../styles/video-card.css'

const VideoCard = ({ video = {} }) => {
  const [engagement, setEngagement] = useState({
    liked: false,
    saved: false,
    likes: video.likes || 0
  })
  const [loading, setLoading] = useState(false)

  // Check if current user has liked this video on mount
  useEffect(() => {
    if (video._id && video.likedBy) {
      const hasLiked = video.likedBy.some(id => {
        return id === localStorage.getItem('userId') || id._id === localStorage.getItem('userId')
      })
      setEngagement(prev => ({
        ...prev,
        liked: hasLiked,
        likes: video.likes || 0
      }))
    }
  }, [video])

  const toggleLike = async () => {
    if (!video._id) return
    
    setLoading(true)
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/food/${video._id}/like`,
        {},
        { withCredentials: true }
      )

      setEngagement(prev => ({
        ...prev,
        liked: response.data.liked,
        likes: response.data.likes
      }))
    } catch (error) {
      console.error('Error toggling like:', error)
      // Fallback for demo purposes
      setEngagement(prev => ({
        ...prev,
        liked: !prev.liked,
        likes: prev.liked ? prev.likes - 1 : prev.likes + 1
      }))
    } finally {
      setLoading(false)
    }
  }

  const toggleSave = () => {
    setEngagement(prev => ({
      ...prev,
      saved: !prev.saved
    }))
  }

  const onVisitStore = (e) => {
    e.stopPropagation()
    const url = video.storeUrl || video.store || video.link
    if (url) window.open(url, '_blank')
  }

  return (
    <div className="video-card">
      {video.video && (
        <video
          src={video.video}
          muted
          loop
          playsInline
          className="video-card__video"
          autoPlay
        />
      )}

      <div className="video-card__overlay">
        <div className="video-card__gradient" />

        <div className="video-card__content">
          <h3 className="video-card__title">{video.name}</h3>

          <div className="video-card__description">
            {video.description || video.caption || 'Delicious food awaits!'}
          </div>

          <button className="video-card__btn" onClick={onVisitStore}>
            visit store
          </button>
        </div>

        <div className="video-card__actions">
          <div className="action-group">
            <button
              className={`action-btn ${engagement.liked ? 'active' : ''}`}
              onClick={toggleLike}
              disabled={loading}
              title="Like"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  fill={engagement.liked ? 'currentColor' : 'none'}
                />
              </svg>
            </button>
            <span className="action-count">{engagement.likes}</span>
          </div>

          <div className="action-group">
            <button
              className="action-btn"
              title="Comment"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </button>
            <span className="action-label">45</span>
          </div>

          <div className="action-group">
            <button
              className={`action-btn ${engagement.saved ? 'active' : ''}`}
              onClick={toggleSave}
              title="Save"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  fill={engagement.saved ? 'currentColor' : 'none'}
                />
              </svg>
            </button>
            <span className="action-label">23</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
