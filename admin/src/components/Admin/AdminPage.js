import React, { useEffect, useState } from 'react'
import SideNavbar from '../SideNavbar/SideNavbar'
import Dashboard from '../Dashboard/Dashboard'
import Blogs from '../Blogs/Blogs'
import Subs from '../Subs/Subs'
import Feedbacks from '../Feedbacks/Feedbacks'
import { Route, Redirect, Switch } from 'react-router-dom'
import AddBlog from '../Blogs/AddBlog'
import UpdateBlog from '../Blogs/UpdateBlog'
import ViewFeedback from '../Feedbacks/FeedbackView'

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
      <Switch>
        <Route path="/admin/dashboard" exact component={Dashboard} />
        <Route path="/admin/blogs" exact component={Blogs} />
        <Route path="/admin/blogs/add" exact component={AddBlog} />
        <Route path="/admin/blogs/:id" exact children={<UpdateBlog />} />
        <Route path="/admin/subs" exact component={Subs} />
        <Route path="/admin/feedbacks" exact component={Feedbacks} />
        <Route path="/admin/feedbacks/:id" exact children={<ViewFeedback />} />
      </Switch>
    </>
  )
}

export default AdminPage
