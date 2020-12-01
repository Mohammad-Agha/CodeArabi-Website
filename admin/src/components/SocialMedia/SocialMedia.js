import React, { useEffect, useState } from 'react'

const SocialMedia = () => {
  const [facebook, setFacebook] = useState('')
  const [insta, setInsta] = useState('')
  const [yt, setYt] = useState('')
  const [twitter, setTwitter] = useState('')
  const [git, setGit] = useState('')
  const [alert, setAlert] = useState('')

  useEffect(() => {
    const run = async () => {
      const response = await fetch(`http://localhost:5000/api/social`)
      const data = await response.json()
      setFacebook(data.data.facebook)
      setInsta(data.data.instagram)
      setYt(data.data.youtube)
      setTwitter(data.data.twitter)
      setGit(data.data.github)
    }
    run()
  }, [])

  const handleChange = e => {
    e.target.name === 'facebook' && setFacebook(e.target.value)
    e.target.name === 'instagram' && setInsta(e.target.value)
    e.target.name === 'youtube' && setYt(e.target.value)
    e.target.name === 'twitter' && setTwitter(e.target.value)
    e.target.name === 'github' && setGit(e.target.value)
  }

  const submitBlogForm = async e => {
    const response = await fetch(`http://localhost:5000/api/social`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authentication': localStorage.getItem('token')
      },
      body: JSON.stringify({
        facebook: facebook.trim(),
        instagram: insta.trim(),
        youtube: yt.trim(),
        twitter: twitter.trim(),
        github: git.trim()
      })
    })
    setAlert(true)
    setTimeout(() => {
      setAlert(false)
    }, 2000)
  }

  return (
    <div className="div-wrapper">
      <div className="component-div">
        <span className="component-name">Manage Social Media Links</span>
        <button className="link-btn big-btn" onClick={submitBlogForm}>Update Links</button>
      </div>
      {alert && <div className="show-alert-green">Social Media Links Updated</div>}
      <form className="add-blog-form">
        <div className="form-group">
          <label>Facebook</label>
          <input value={facebook} onChange={handleChange} type="text" name="facebook" />
        </div>
        <div className="form-group">
          <label>Instagram</label>
          <input value={insta} onChange={handleChange} type="text" name="instagram" />
        </div>
        <div className="form-group">
          <label>Youtube</label>
          <input value={yt} onChange={handleChange} type="text" name="youtube" />
        </div>
        <div className="form-group">
          <label>Twitter</label>
          <input value={twitter} onChange={handleChange} type="text" name="twitter" />
        </div>
        <div className="form-group">
          <label>GitHub</label>
          <input value={git} onChange={handleChange} type="text" name="github" />
        </div>
      </form>
    </div>
  )
}

export default SocialMedia
