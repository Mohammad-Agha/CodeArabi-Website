import React from 'react';
import '../App.css';
import './HeroSection.css'
import { Link } from 'react-router-dom';


function HeroSection() {
  return (
    <div className="hero--container">
      <h1>التعليمات البرمجية في العربي</h1>
      <p>للوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور

      أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد

      أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواس

أيوتي أريري دولار إن ريبريهينديرأيت </p>
      <div className='hero-btns'>
        <Link className="btn-link" to='/about'>
          إقرأ المزيد عنا
        </Link>
      </div>
    </div>
  );
}

export default HeroSection
