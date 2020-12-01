import React, { useState, useEffect } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  const [facebook, setFacebook] = useState('')
  const [insta, setInsta] = useState('')
  const [yt, setYt] = useState('')
  const [twitter, setTwitter] = useState('')
  const [git, setGit] = useState('')
  const [email, setEmail] = useState('')

  const [emailError, setEmailError] = useState(null)

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

  const handler = e => {
    setEmail(e.target.value)
  }

  const submitForm = async e => {
    e.preventDefault()
    let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    if (!pattern.test(email)) {
      setEmailError("عنوان البريد الإلكتروني غير صالح");
      setTimeout(() => {
        setEmailError(null)
      }, 2000)
      return
    }
    const response = await fetch(`http://localhost:5000/api/subs/${email}`)
    const data = await response.json()
    if (data.msg) {
      const response = await fetch(`http://localhost:5000/api/subs`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email
        })
      })
      setEmailError('شكرا لك على الاشتراك')
      setTimeout(() => {
        setEmailError(null)
      }, 2000)
    }
    else {
      setEmailError('إنك بالفعل مشترك')
      setTimeout(() => {
        setEmailError(null)
      }, 2000)
    }
  }

  return (
    <div className='footer-container'>

      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          انضم إلى النشرة الإخبارية لتلقي آخر المدونات
        </p>
        <div className='input-areas'>
          <form onSubmit={submitForm}>
            <div className="input-areas-contol">
              <input
                className='footer-input'
                name='email'
                type='email'
                placeholder='بريدك الالكتروني'
                onChange={handler}
                value={email}
              />
            </div>
            <div className="input-areas-contol">
              <button type="submit" style={{ width: "100%" }} className='btn-link'>
                إشترك الآن
          </button>
            </div>
            <div className="input-areas-control">
              <p>{emailError && emailError}</p>
            </div>
          </form>
        </div>
      </section>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              &lt;/<span style={{ color: "#90ee90c5" }}>عربي</span>.كود&gt;
            </Link>
          </div>
          <small className='website-rights' >  كود عربي © ٢٠٢٠  </small>
          <div className='social-icons'>
            {facebook.length > 0 ? <a
              className='social-icon-link facebook'
              href={facebook}
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </a> : ''}

            {insta.length > 0 ? <a
              className='social-icon-link instagram'
              href={insta}
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </a> : ''}
            {yt.length > 0 ? <a
              className='social-icon-link Youtube'
              href={yt}
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' />
            </a> : ''}
            {twitter.length > 0 ? <a
              className='social-icon-link twitter'
              href={twitter}
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
            </a> : ''}
            {git.length > 0 ? <a
              className='social-icon-link github'
              href={git}
              target='_blank'
              aria-label='GitHub'
            >
              <i className='fab fa-github' />
            </a> : ''}
          </div>
        </div>
      </section>
    </div >
  );
}


export default Footer;