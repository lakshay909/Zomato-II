import React, { useEffect } from 'react'
import '../../styles/profile.css'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Profile = () => {
    const params = useParams()
    // prefer `id`, fall back to `profile` if a route used that name
    const routeId = (params.id ?? params.profile)?.startsWith(':') ? (params.id ?? params.profile).slice(1) : (params.id ?? params.profile)
    const [profile, setprofile] = useState(null)
    const [videos, setVideos] = useState([])

    useEffect(() => {
      if (!routeId) return
      let mounted = true
      axios.get(`http://localhost:3000/api/food-partner/${routeId}`, { withCredentials: true })
      .then(res => {
        if (!mounted) return
        setprofile(res.data.foodPartner)
        setVideos(res.data.foodPartner.foodItems || [])
      })
      .catch(err => {
        if (!mounted) return
        console.error('Failed to load profile', err)
        setprofile(null)
      })
      return () => { mounted = false }
    },[routeId])

    const data = {
        name: profile ? profile.fullName : 'Food Partner Name',
        address: profile ? profile.email : '123, Food Street, City',
        totalMeals: 43,
        customerServe: '15K',
        videos: videos
    }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-top">
          <div className="avatar" aria-hidden="true" />
          <div className="info">
            <div className="pills">
              <span className="pill name">{data.name}</span>
              <span className="pill address">{data.address}</span>
            </div>
          </div>
        </div>

        <div className="stats">
          <div className="stat">
            <div className="label">total meals</div>
            <div className="value">{data.totalMeals}</div>
          </div>
          <div className="stat">
            <div className="label">customer serve</div>
            <div className="value">{data.customerServe}</div>
          </div>
        </div>
      </div>

      <div className="videos-grid">
        {data.videos.map(v => (
          <Link className="video-tile" to={`/food-partner/video/${v.id}`} key={v.id}>
            <div className="video-placeholder">video</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Profile