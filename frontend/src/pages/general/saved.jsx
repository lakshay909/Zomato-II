import React, { useState } from 'react'
import BottomNav from '../../components/BottomNav'
import '../../styles/saved.css'

const Saved = () => {
  const [savedItems, setSavedItems] = useState([
    {
      id: 's1',
      title: 'Video',
      description: 'Delicious biryani from Zomato',
      video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      likes: 156,
      comments: 42
    },
    {
      id: 's2',
      title: 'Video',
      description: 'Amazing desserts and pastries',
      video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      likes: 89,
      comments: 28
    },
    {
      id: 's3',
      title: 'Video',
      description: 'Fresh and tasty meals',
      video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      likes: 203,
      comments: 61
    }
  ])

  const handleRemoveSaved = (id) => {
    setSavedItems(prev => prev.filter(item => item.id !== id))
  }

  return (
    <div className="saved-page">
      <div className="saved-container">
        <h1 className="saved-title">Saved</h1>

        {savedItems.length === 0 ? (
          <div className="saved-empty">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>No saved items yet</p>
          </div>
        ) : (
          <div className="saved-grid">
            {savedItems.map(item => (
              <div key={item.id} className="saved-card">
                {item.video && (
                  <div className="saved-card__image">
                    <video
                      src={item.video}
                      muted
                      loop
                      playsInline
                      className="saved-card__video"
                    />
                  </div>
                )}

                <div className="saved-card__content">
                  <h3 className="saved-card__title">{item.title}</h3>
                  <p className="saved-card__description">{item.description}</p>

                  <div className="saved-card__stats">
                    <span className="stat">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          fill="none"
                        />
                      </svg>
                      {item.likes}
                    </span>
                    <span className="stat">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          fill="none"
                        />
                      </svg>
                      {item.comments}
                    </span>
                  </div>
                </div>

                <button
                  className="saved-card__remove"
                  onClick={() => handleRemoveSaved(item.id)}
                  title="Remove from saved"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}

export default Saved
