import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Redirect } from "react-router-dom";
import Login from './components/Admin/Login'
import AdminPage from './components/Admin/AdminPage'

import './App.css'

function App() {
  const [redirect, setRedirect] = useState(null)

  useEffect(() => {
    let isMounted = true
    const run = async () => {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/admin', {
        headers: {
          'Authentication': token
        }
      })
      const data = await response.json()
      if (data.msg) {
        setRedirect('/login')
      }
      else {
        setRedirect('/admin/blogs')
      }
    }
    if (isMounted) {
      run()
    }
    return () => { isMounted = false }
  }, [])

  const redirectFunc = () => {
    if (redirect) {
      return <Redirect to={redirect} />
    }
  }

  return (
    <Router>
      {redirectFunc()}
      <Route path="/" exact component={AdminPage} />
      <Route path="/login" exact render={(props) => <Login {...props} />} />
      <Route path="/admin" component={AdminPage} />
    </Router>
  );
}

export default App;
