import React, { useState } from 'react'
import { Redirect } from "react-router-dom";

import './Login.css'

const Login = () => {
  const [redirect, setRedirect] = useState(null)
  const [username, setUsername] = useState('CodeArabi')
  const [password, setPassword] = useState('12345678')
  const [error, setError] = useState('')

  const handleChange = event => {
    event.target.name === 'username' && setUsername(event.target.value)
    event.target.name === 'password' && setPassword(event.target.value)
  }

  const redirectFunc = () => {
    if (redirect) {
      return <Redirect to={redirect} />
    }
  }

  const onSubmit = async event => {
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/admin',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        }
      )
      const data = await response.json()
      if (data.errors) {
        setError('Invalid Credentials')
        setTimeout(() => {
          setError('')
        }, 3000)
      }
      else {
        localStorage.setItem('token', data.token)
        setRedirect('/admin')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {redirectFunc()}
      <div className="login-header">
        <span className="login-brand">CodeArabi</span>
      </div>
      <div className="login-admin-area">
        <h1 className="admin-area__heading">Admin Area <small>Account Login</small></h1>
      </div>
      <div className="form-area">
        <form className="login-form" onSubmit={onSubmit}>
          <div className="form-wrapper">
            <div className="form-group">
              <label>Username</label>
              <input type="text" placeholder="Username" onChange={handleChange} name="username" value={username} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Password" onChange={handleChange} name="password" value={password} />
            </div>
            <div className="form-group">
              <button className="login-btn">Login</button>
            </div>
            {error && <div className="alert-credentials">{error}</div>}
          </div>
        </form>
      </div>
      <footer className="login-footer">Copyright CodeArabi &copy; 2020 </footer>
    </div>
  )
}

export default Login
