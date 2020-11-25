import React from 'react'
import { Link } from 'react-router-dom'

import './SideNavbar.css'

const SideNavbar = () => {

  const logout = () => {
    localStorage.removeItem('token')
  }
  return (
    <nav className="nav">
      <img className="logo" src="" alt="main-logo" />
      <hr className="nav__line" />
      <ul className="nav-links">
        <Link className="nav-link" to='/admin/dashboard'>
          <li>Dashboard</li>
        </Link>

        <Link className="nav-link" to='/admin/blogs'>
          <li>Blogs</li>
        </Link>

        <Link className="nav-link" to='/admin/subs'>
          <li>Subscribers</li>
        </Link>

        <Link className="nav-link" to='/admin/feedbacks'>
          <li>Feedback</li>
        </Link>

        <Link className="nav-link" onClick={logout} to='/login'>
          <li>Logout</li>
        </Link>
      </ul>
    </nav>
  )
}

export default SideNavbar
