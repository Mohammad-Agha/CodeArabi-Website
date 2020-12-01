import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const FeedbackView = () => {
  const { id } = useParams()
  const feedbackId = useState(id)[0]

  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [email, setEmail] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    const run = async () => {
      const response = await fetch(`http://localhost:5000/api/contact/${feedbackId}`, {
        headers: {
          'Authentication': localStorage.getItem('token')
        }
      })
      const data = await response.json()
      setName(data.name)
      setTitle(data.title)
      setEmail(data.email)
      setBody(data.body)
    }
    run()
  }, [])

  return (
    <div className="div-wrapper">
      <div className="component-div">
        <span className="component-name">Feedback from {name}, {email}</span>
      </div>
      <div className="form-group">
        <label>Title</label>
        <input style={{ fontSize: "1rem" }} value={title} type="text" disabled />
      </div>
      <div className="form-group">
        <label>Body</label>
        <textarea style={{ fontSize: "1rem", width: "100%", height: "600px", border: "3px solid #cccccc", padding: "5px" }} value={body} disabled></textarea>
      </div>
    </div>
  )
}

export default FeedbackView
