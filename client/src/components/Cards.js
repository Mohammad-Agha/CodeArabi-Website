import React, {useEffect, useState} from 'react';
import './Cards.css';
import './Button.css';
import CardItem from './CardItem';
import { Link } from 'react-router-dom';


function Cards() {
  const [blogs, setBlogs] = useState([])

  useEffect(()=>{
    const run = async () => {
      const response= await fetch('http://localhost:5000/api/blog/featured/top')
      const data=await response.json()
      console.log(data.data)
      setBlogs(data.data)
      
    } 
    run()
  },[])


  return (
    <div className='cards'>
      <h1>المدونات</h1>
      
      <div className='cards__container'>
        <div className='cards__wrapper'>
          
          <ul className='cards__items'>
            <CardItem
              src='images/logo.jpg'
              text='لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور

              أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد
              
              أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات  '
              label='أيكسبرس'
              path='/blogs/3'
            />
            <CardItem
              src='images/logo.jpg'
              text='لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور

              أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد
              
              أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات'
              label='مونغو'
              path='/blogs/4'
            />
            <CardItem
              src='images/logo.jpg'
              text='لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور

              أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد
              
              أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات  '
              label='لارافال'
              path='/blogs/5'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/logo.jpg'
              text='لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور

              أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد
              
              أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات  '
              label='أيكسبرس'
              path='/blogs/3'
            />
            <CardItem
              src='images/logo.jpg'
              text='لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور

              أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد
              
              أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات .'
              label='مونغو'
              path='/blogs/4'
            />
            <CardItem
              src='images/logo.jpg'
              text='لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور

              أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد
              
              أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات  '
              label='لارافال'
              path='/blogs/5'
            />
          </ul>
        </div>
        <Link to='/blogs'>
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

export default Cards;