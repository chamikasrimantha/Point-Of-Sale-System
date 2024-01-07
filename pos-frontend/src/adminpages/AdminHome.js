import React, { useEffect } from 'react'
import './Admin.css'
import AdminNavBar from './components/AdminNavBar'

export default function AdminHome() {

  useEffect(() => {

  }, [])

  return (
    <div>
      <AdminNavBar />

      <div className="admin-home">
        <div className="admin-home-content">
          <h1>Welcome to Admin Dashboard</h1>
          <p>POS Software ...</p>
        </div>
      </div>
    </div>
  )
}
