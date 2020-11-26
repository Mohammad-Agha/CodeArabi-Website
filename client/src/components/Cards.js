import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import { Link } from 'react-router-dom';


function Cards() {
  return (
    <div className='cards'>
      <h1>Blogs</h1>
      
      <div className='cards__container'>
        <div className='cards__wrapper'>
          
          <ul className='cards__items'>
            <CardItem
              src='images/first-image.jpg'
              text='لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور

              أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد
              
              أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات . '
              label='Express'
              path='/blogs/3'
            />
            <CardItem
              src='images/first-image.jpg'
              text='لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور

              أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد
              
              أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات .'
              label='Mongo'
              path='/blogs/4'
            />
            <CardItem
              src='images/first-image.jpg'
              text='لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور

              أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد
              
              أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات . '
              label='React'
              path='/blogs/5'
            />
          </ul>
        </div>
        <Link to="/blogs" className='btnblog'>
                     View More  
            </Link>
      </div>
      
    </div>
  );
}

export default Cards;