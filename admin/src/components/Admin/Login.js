import React, { useState } from 'react'
import { Redirect } from "react-router-dom";

const Login = ({ setToken }) => {
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
        }, 2000)
      }
      else {
        setToken(data.token)
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
      <form onSubmit={onSubmit}>
        <input type="text" onChange={handleChange} name="username" value={username} />
        <input type="password" onChange={handleChange} name="password" value={password} />
        <input type="submit" value="login" />
        {error}
      </form>
    </div>
  )
}

export default Login
