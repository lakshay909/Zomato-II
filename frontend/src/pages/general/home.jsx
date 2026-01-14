import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import '../../styles/home.css'

const ReelFeed = ({ videos = [] }) => {
  const containerRef = useRef(null)
  const videoRefs = useRef(new Map())

  useEffect(() => {
    const options = { threshold: [0.6] }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target.querySelector('video')
        if (!video) return
        if (entry.intersectionRatio >= 0.6) {
          video.play().catch(() => {})
        } else {
          try { video.pause() } catch (e) { /* noop */ }
        }
      })
    }, options)

    const reels = containerRef.current?.querySelectorAll('.reel') || []
    reels.forEach(r => observer.observe(r))

    return () => observer.disconnect()
  }, [videos])

  const onVisitStore = (e, item) => {
    e.stopPropagation()
    const url = item.storeUrl || item.store || item.link
    if (url) window.open(url, '_blank')
  }

  return (
    <div className="reels-page">
      <div ref={containerRef} className="reels-feed" aria-label="Reels">
        {Array.isArray(videos) && videos.map(v => (
          <section className="reel" key={v._id || v.id}>
            <video
              ref={el => videoRefs.current.set(v._id || v.id, el)}
              src={v.video || v.src}
              muted
              loop
              playsInline
              className="reel-video"
            />

            <div className="reel-overlay">
              <div className="reel-overlay-gradient" />
              <div className="reel-content">
                <div className="reel-description" aria-hidden={false}>
                  {v.description || v.caption || v.title || ''}
                </div>
                <button
                  className="reel-btn"
                  onClick={(e) => onVisitStore(e, v)}
                >
                  Visit Store
                </button>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

const Home = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [raw, setRaw] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const resp = await axios.get('http://localhost:3000/api/food', { withCredentials: true })
        setRaw(resp.data)
        const items = resp.data?.foodItems || resp.data?.foodItem || resp.data?.food || resp.data
        if (Array.isArray(items)) setVideos(items)
        else if (Array.isArray(items?.foodItem)) setVideos(items.foodItem)
        else setVideos([])
      } catch (err) {
        // try relative endpoint as fallback
        try {
          const resp2 = await axios.get('/api/food')
          setRaw(resp2.data)
          const items = resp2.data?.foodItems || resp2.data?.foodItem || resp2.data?.food || resp2.data
          if (Array.isArray(items)) setVideos(items)
          else setVideos([])
        } catch (err2) {
          setError(err2?.response?.data || err2.message || String(err2))
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // provide a simple fallback so the page isn't blank while debugging
  const fallback = [{
    _id: 'sample-1',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    description: 'Sample fallback video — replace with your database items.'
  }]

  return (
    <>
      {error && (
        <div style={{position: 'fixed', top:10, left:10, zIndex:1200, background: '#fff', color:'#000', padding:10, borderRadius:6, boxShadow:'0 6px 18px rgba(0,0,0,.12)'}}>
          <strong>API error:</strong>
          <pre style={{maxWidth:420, maxHeight:160, overflow:'auto', margin:6}}>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}

      <ReelFeed videos={videos.length ? videos : fallback} />

      <div style={{position:'fixed', right:12, top:12, zIndex:1200, color:'#222', background:'#fff', padding:8, borderRadius:6, fontSize:12, boxShadow:'0 6px 18px rgba(0,0,0,.06)'}}>
        <div><strong>Debug</strong></div>
        <div>Loading: {String(loading)}</div>
        <div>Items: {videos.length}</div>
        <details style={{maxWidth:360}}>
          <summary>Raw response</summary>
          <pre style={{maxHeight:220, overflow:'auto'}}>{raw ? JSON.stringify(raw, null, 2) : '—'}</pre>
        </details>
      </div>
    </>
  )
}

export default Home