import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import VideoCard from '../../components/VideoCard'
import BottomNav from '../../components/BottomNav'
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

  return (
    <div className="reels-page">
      <div ref={containerRef} className="reels-feed" aria-label="Reels">
        {Array.isArray(videos) && videos.map(v => (
          <section className="reel" key={v._id || v.id}>
            <VideoCard video={v} />
          </section>
        ))}
      </div>
      <BottomNav />
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
      <ReelFeed videos={videos.length ? videos : fallback} />
    </>
  )
}

export default Home