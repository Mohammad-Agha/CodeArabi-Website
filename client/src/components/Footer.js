import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import './Button.css';

function Footer() {
  return (
    <div className='footer-container'>
      
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Join the Codings newsletter to receive our best coding snippets
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
          
          <form> 
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <Link to="/subscribe" className='subscribe'>
                     Subscribe  
            </Link>
          </form>
          </div>
      </section>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              CodeArabic
              <i class='fas fa-code' />
            </Link>
          </div>
          <small class='website-rights'>CodeArabic © 2020</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


export default Footer;