import React from 'react';
import '../App.css';
import './Button.css';
import './HeroSection.css'
import { Link } from 'react-router-dom';


function HeroSection() {
    return (
        <div className="hero--container">
            <img src="/images/second.jpg" alt='coding' ></img>
           <h1>كود عربي</h1> 
           <p>للوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور

أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد

أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواس

أيوتي أريري دولار إن ريبريهينديرأيت </p>
     <div className='hero-btns'>
       <Link to='/about'>
        <div class="button">
                  <p class="btnText">عرض المزيد</p>
               <div class="btnTwo">
                  <p class="btnText2">انطلق</p>
               </div>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection
