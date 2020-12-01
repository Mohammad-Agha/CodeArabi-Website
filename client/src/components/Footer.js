import React, { useState } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {

  const [email, setEmail] = useState('')

  const handler = e => {
    setEmail(e.target.value)
  }

  const submitForm = async e => {
    e.preventDefault()
    // const
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
          </form>
        </div>
      </section>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              &lt;/<span style={{ color: "#90ee906c" }}>عربي</span>.كود&gt;
            </Link>
          </div>
          <small className='website-rights' > ٢٠٢٠ © كود عربي</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </Link>
            <Link
              className='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </Link>
            <Link
              className='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div >
  );
}


export default Footer;