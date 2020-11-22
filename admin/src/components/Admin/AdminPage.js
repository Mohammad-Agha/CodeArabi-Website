import React, { useEffect, useState } from 'react'
import SideNavbar from '../SideNavbar/SideNavbar'
import Dashboard from '../Dashboard/Dashboard'
import Blogs from '../Blogs/Blogs'
import Subs from '../Subs/Subs'
import Feedbacks from '../Feedbacks/Feedbacks'
import { Route, Redirect } from 'react-router-dom'

const AdminPage = () => {
  const [redirect, setRedirect] = useState(null)

  const redirectFunc = () => {
    if (redirect) {
      return <Redirect to={redirect} />
    }
  }
  useEffect(() => {
    setRedirect('/admin/dashboard')
  }, [])

  return (
    <>
      {redirectFunc()}
      <SideNavbar />
      <Route path="/admin/dashboard" exact component={Dashboard} />
      <Route path="/admin/blogs" exact component={Blogs} />
      <Route path="/admin/subs" exact component={Subs} />
      <Route path="/admin/feedbacks" exact component={Feedbacks} />
    </>
  )
}

export default AdminPage
