import React from 'react'
import TotalBlogs from './TotalBlogs'
import TotalImages from './TotalImages'
import TotalSubs from './TotalSubs'
import TotalFeedbacks from './TotalFeedbacks'

import './Dashboard.css'

const Dashboard = () => {
  return (
    <div className="div-wrapper">
      <div className="dashboard">
        <TotalBlogs />
        <TotalImages />
        <TotalSubs />
        <TotalFeedbacks />
      </div>
    </div>
  )
}

export default Dashboard
