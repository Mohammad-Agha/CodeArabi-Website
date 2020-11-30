import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';



function Footer() {
  return (
    <div className='footer-container'>
      
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
        انضم إلى النشرة الإخبارية لتلقي أفضل مقتطفات الترميز
        </p>
        <p className='footer-subscription-text'>
        يمكنك إلغاء الاشتراك في أي وقت
        </p>
        <div className='input-areas'>
          
          <form> 
          <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='بريدك الالكتروني'
            />
            <br/>
            <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          اشترك الان
        </Button>
            
          </form>
          </div>
      </section>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
          <img src="/images/second.jpg" alt='coding' ></img>
            <Link to='/' className='social-logo'>
              كود عربي
              <i class='fas fa-code' />
            </Link>
          </div>
          <small class='website-rights' > ٢.٢. © كود عربي</small>
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