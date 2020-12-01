import React, { useEffect, useState } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import { Link } from 'react-router-dom';


function Cards() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const run = async () => {
      const response = await fetch('http://localhost:5000/api/blog/featured/top')
      const data = await response.json()
      console.log(data);
      setBlogs(data.data)
    }
    run()
  }, [])


  return (
    <div className='cards'>
      <h1>المدونات</h1>
      <div className='cards__container'>
        <ul className='cards__items'>
          {blogs.map((data, key) => <CardItem key={key} data={data} />)}
        </ul>
      </div>
      <div style={{ textAlign: "center" }}>
        <Link className="btn-link" to='/blogs'>
          عرض جميع المدونات
        </Link>
      </div>
    </div>
  );
}

export default Cards;