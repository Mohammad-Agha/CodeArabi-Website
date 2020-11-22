import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Redirect } from "react-router-dom";
import Login from './components/Admin/Login'
import AdminPage from './components/Admin/AdminPage'

import './App.css'

function App() {
  const [token, setToken] = useState(null)
  const [redirect, setRedirect] = useState(null)
  useEffect(() => {
    const run = async () => {
      const response = await fetch('http://localhost:5000/api/admin')
      const data = await response.json()
      if (data.msg) {
        setRedirect('/login')
      }
    }
    run()
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
      <Route path="/login" exact render={(props) => <Login {...props} setToken={setToken} />} />
      <Route path="/admin" component={AdminPage} />
    </Router>
  );
}

export default App;
